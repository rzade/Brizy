import React from "react";
import classnames from "classnames";
import EditorComponent from "visual/editorComponents/EditorComponent";
import Config from "visual/global/Config";
import CustomCSS from "visual/component/CustomCSS";
import BoxResizer from "visual/component/BoxResizer";
import Placeholder from "visual/component/Placeholder";
import Toolbar from "visual/component/Toolbar";
import * as toolbarConfig from "./toolbar";
import * as sidebarConfig from "./sidebar";
import { style } from "./styles";
import { css } from "visual/utils/cssStyle";
import defaultValue from "./defaultValue.json";

const resizerPoints = ["centerLeft", "centerRight"];
const resizerRestrictions = {
  width: {
    min: 5,
    max: 100
  },
  tabletWidth: {
    min: 5,
    max: 100
  },
  mobileWidth: {
    min: 5,
    max: 100
  }
};

export default class EmbedCode extends EditorComponent {
  static get componentId() {
    return "EmbedCode";
  }

  static defaultValue = defaultValue;

  handleResizerChange = patch => this.patchValue(patch);

  renderForEdit(v, vs, vd) {
    const { isApproved } = Config.get("user");
    const { code } = v;

    const className = classnames(
      "brz-embed-code",
      css(
        `${this.constructor.componentId}`,
        `${this.getId()}`,
        style(v, vs, vd)
      )
    );

    const content =
      code && (TARGET === "WP" ? true : isApproved) ? (
        <div
          className={classnames({ "brz-blocked": IS_EDITOR })}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      ) : (
        <Placeholder icon="iframe" />
      );

    return (
      <Toolbar
        {...this.makeToolbarPropsFromConfig2(toolbarConfig, sidebarConfig)}
      >
        <CustomCSS selectorName={this.getId()} css={v.customCSS}>
          <div className={className}>
            <BoxResizer
              points={resizerPoints}
              restrictions={resizerRestrictions}
              meta={this.props.meta}
              value={v}
              onChange={this.handleResizerChange}
            >
              <div className="brz-embed-content">{content}</div>
            </BoxResizer>
          </div>
        </CustomCSS>
      </Toolbar>
    );
  }

  renderForView(v, vs, vd) {
    if (TARGET === "WP") {
      return this.renderForEdit(v, vs, vd);
    } else {
      const { isApproved } = Config.get("user");

      return isApproved ? this.renderForEdit(v, vs, vd) : null;
    }
  }
}
