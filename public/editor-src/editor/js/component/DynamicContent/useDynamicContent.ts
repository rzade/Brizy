import { useState, useEffect } from "react";
import { getDynamicContent } from "visual/utils/api/editor/index";
import {
  TGetDynamicContentResolve,
  TGetDynamicContentReject
} from "visual/utils/api/editor/types";

export type DynamicContentState =
  | {
      status: "empty" | "idle" | "waiting";
      data: null;
      error: null;
    }
  | {
      status: "success";
      data: string;
      error: null;
    }
  | {
      status: "failed";
      data: null;
      error: string;
    };

export function useDynamicContent(
  placeholder: string | undefined | null,
  delayMs = 0
): DynamicContentState {
  if (placeholder === undefined || placeholder === null || placeholder === "") {
    return {
      status: "empty",
      data: null,
      error: null
    };
  }

  if (IS_PREVIEW) {
    return {
      status: "success",
      data: placeholder,
      error: null
    };
  }

  const [state, setState] = useState<DynamicContentState>({
    status: delayMs > 0 ? "idle" : "waiting",
    data: null,
    error: null
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let tid: number;

    getDynamicContent({
      placeholders: [placeholder],
      signal
    })
      .then((r: TGetDynamicContentResolve) => {
        if (signal.aborted === false) {
          setState({
            status: "success",
            data: r[0],
            error: null
          });
        }
      })
      .catch((e: TGetDynamicContentReject) => {
        if (signal.aborted === false) {
          setState({
            status: "failed",
            data: null,
            error: e
          });
        }
      })
      .finally(() => {
        window.clearTimeout(tid);
      });

    if (delayMs > 0) {
      tid = window.setTimeout(() => {
        setState(state =>
          state.status === "success" || state.status === "failed"
            ? state
            : {
                status: "waiting",
                data: null,
                error: null
              }
        );
      }, delayMs);
    }

    return (): void => {
      controller.abort();
    };
  }, [placeholder]);

  return state;
}
