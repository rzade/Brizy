import { NumberSpec } from "visual/utils/math/number";
import { String } from "visual/utils/string/specs";
import { mCompose, MValue } from "visual/utils/value";
import { Literal } from "visual/utils/types/Literal";
import { Position } from "./Position";
import * as P from "./Position";
import { HAlign } from "./HAlign";
import * as H from "./HAlign";
import { VAlign } from "./VAlign";
import * as V from "./VAlign";
import { Setter } from "visual/utils/model";
import { Reader } from "visual/utils/types/Type";

type M<T extends Literal> = { [k in string]: T };
type Getter<T> = (get: (k: string) => MValue<Literal>) => MValue<T>;
type Unit = "px" | "%";

const readUnit: Reader<Unit> = mCompose(
  v => ((v && v === "px") || v === "%" ? v : undefined),
  String.read
);

export const getPosition: Getter<Position> = get =>
  P.read(get("elementPosition"));

export const getHAlign: Getter<HAlign> = get => H.read(get("offsetXAlignment"));

export const getVAlign: Getter<VAlign> = get => V.read(get("offsetYAlignment"));

export const getHOffset: Getter<number> = get =>
  NumberSpec.read(get("offsetX"));

export const setHOffset: Setter<number, M<number>> = (v, m) => ({
  ...m,
  offsetX: v
});

export const getHUnit: Getter<Unit> = get => readUnit(get("offsetXUnit"));

export const getVOffset: Getter<number> = get =>
  NumberSpec.read(get("offsetY"));

export const setVOffset: Setter<number, M<number>> = (v, m) => ({
  ...m,
  offsetY: v
});

export const getVUnit: Getter<Unit> = get => readUnit(get("offsetYUnit"));
