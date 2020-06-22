import {
  styleBgColor,
  styleColor,
  styleElementTableAside,
  styleElementTableAsideWidth,
  styleElementTableColumns,
  styleElementTableHorizontalAlign,
  styleElementTableIconPosition,
  styleElementTableIconSize,
  styleElementTableIconSpacing,
  styleElementTableWidth
} from "visual/utils/style2";

export function cssStyleElementTableWidth({ v, device, state }) {
  const width = styleElementTableWidth({ v, device, state });
  return `width:  ${width}%;`;
}

export function cssStyleElementTableIconSize({ v, device, state }) {
  const iconCustomSize = styleElementTableIconSize({ v, device, state });
  return `font-size: ${iconCustomSize}px;`;
}

export function cssStyleElementTableSpacing({ v, device, state }) {
  const iconPosition = styleElementTableIconPosition({ v, device, state });
  const iconSpacing = styleElementTableIconSpacing({ v, device, state });
  return iconPosition === "left"
    ? `margin: auto ${iconSpacing}px auto 0;`
    : `margin: auto 0 auto ${iconSpacing}px;`;
}

export function cssStyleElementTableBtnIconPosition({ v, device, state }) {
  const iconPosition =
    styleElementTableIconPosition({ v, device, state }) === "left"
      ? "row"
      : "row-reverse";
  return `flex-direction: ${iconPosition};`;
}

export function cssStyleElementTableCustomFlexHorizontalAlign({
  v,
  device,
  state
}) {
  const horizontalAlign = styleElementTableHorizontalAlign({
    v,
    device,
    state
  });
  const iconPosition = styleElementTableIconPosition({ v, device, state });

  const aligns = {
    left: "flex-start",
    center: "center",
    right: "flex-end"
  };

  if (iconPosition === "left" || horizontalAlign === "center") {
    return `justify-content: ${aligns[horizontalAlign]};`;
  } else if (horizontalAlign === "left") {
    return "justify-content: flex-end;";
  } else if (horizontalAlign === "right") {
    return "justify-content: flex-start;";
  }
}

export function cssStyleElementTableAsideWidth({ v, device, state }) {
  const aside = styleElementTableAside({ v, device, state });

  if (aside === "on") {
    const width = styleElementTableAsideWidth({ v, device, state });
    return `width: ${width}px;`;
  }

  const columns = styleElementTableColumns({ v, device, state });
  return `width: calc(100% / ${columns});`;
}

export function cssStyleElementTableAsideAllWidth({ v, device, state }) {
  const aside = styleElementTableAside({ v, device, state });
  const width = styleElementTableAsideWidth({ v, device, state });
  const columns = styleElementTableColumns({ v, device, state });

  if (aside === "on") {
    return `width: calc(100% / ${columns} - ${width}px);`;
  }

  return `width: calc(100% / ${columns});`;
}

export function cssStyleElementTableEvenBgColor({ v, device, state }) {
  const bgColor = styleBgColor({ v, device, state, prefix: "activeBg" });
  return `background-color:  ${bgColor};`;
}

export function cssStyleElementTableEvenColor({ v, device, state }) {
  const color = styleColor({ v, device, state, prefix: "activeColor" });
  return `color:  ${color};`;
}
