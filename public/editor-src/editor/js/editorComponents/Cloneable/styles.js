import classnames from "classnames";
import { css } from "glamor";
import { hexToRgba } from "visual/utils/color";

const aligns = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};

export function styleClassName(v, props) {
  const { customClassName, showOnDesktop, showOnMobile } = v;
  const { className: propsClassName } = props;
  let glamorObj;

  if (IS_PREVIEW) {
    glamorObj = {
      ".brz &": {
        display: showOnDesktop === "on" ? "block" : "none"
      },

      "@media (max-width: 767px)": {
        ".brz &": {
          display: showOnMobile === "on" ? "block" : "none"
        }
      }
    };
  }

  const glamorClassName = String(css(glamorObj));

  return classnames(
    "brz-wrapper-clone",
    glamorClassName,
    customClassName,
    propsClassName
  );
}

export function bgStyleClassName(v) {
  let glamorObj;

  if (IS_EDITOR) {
    const { showOnDesktop, showOnMobile } = v;
    const blurred = {
      filter: "blur(3px)",
      opacity: 0.9
    };

    glamorObj = {
      zIndex: "var(--zIndex)",

      "> .brz-bg-media": {
        borderTopWidth: "var(--borderTopWidth)",
        borderRightWidth: "var(--borderRightWidth)",
        borderBottomWidth: "var(--borderBottomWidth)",
        borderLeftWidth: "var(--borderLeftWidth)",
        borderColor: "var(--borderColor)",
        borderStyle: "var(--borderStyle)",
        borderTopLeftRadius: "var(--borderTopLeftRadius)",
        borderTopRightRadius: "var(--borderTopRightRadius)",
        borderBottomLeftRadius: "var(--borderBottomLeftRadius)",
        borderBottomRightRadius: "var(--borderBottomRightRadius)"
      },
      "> .brz-bg-content": {
        borderTopWidth: "var(--borderTopWidth)",
        borderRightWidth: "var(--borderRightWidth)",
        borderBottomWidth: "var(--borderBottomWidth)",
        borderLeftWidth: "var(--borderLeftWidth)",
        borderColor: "transparent",
        borderStyle: "solid"
      },
      ".brz-ed--desktop &": {
        marginTop: "var(--marginTop)",
        marginRight: "var(--marginRight)",
        marginBottom: "var(--marginBottom)",
        marginLeft: "var(--marginLeft)",
        ...(showOnDesktop === "on" ? null : blurred),

        "> .brz-bg-media > .brz-bg-image": {
          backgroundImage: "var(--backgroundImage)",
          backgroundPositionX: "var(--backgroundPositionX)",
          backgroundPositionY: "var(--backgroundPositionY)"
        },
        "> .brz-bg-media > .brz-bg-color": {
          backgroundColor: "var(--backgroundColor)"
        }
      },
      ".brz-ed--mobile &": {
        marginTop: "var(--mobileMarginTop)",
        marginRight: "var(--mobileMarginRight)",
        marginBottom: "var(--mobileMarginBottom)",
        marginLeft: "var(--mobileMarginLeft)",
        ...(showOnMobile === "on" ? null : blurred),

        "> .brz-bg-media > .brz-bg-image": {
          backgroundImage: "var(--mobileBackgroundImage)",
          backgroundPositionX: "var(--mobileBackgroundPositionX)",
          backgroundPositionY: "var(--mobileBackgroundPositionY)"
        },
        "> .brz-bg-media > .brz-bg-color": {
          backgroundColor: "var(--mobileBackgroundColor)"
        }
      }
    };
  } else {
    const {
      marginType,
      margin,
      marginSuffix,
      marginTop,
      marginTopSuffix,
      marginRight,
      marginRightSuffix,
      marginBottom,
      marginBottomSuffix,
      marginLeft,
      marginLeftSuffix,
      zIndex,
      mobileMarginType,
      mobileMargin,
      mobileMarginSuffix,
      mobileMarginTop,
      mobileMarginTopSuffix,
      mobileMarginRight,
      mobileMarginRightSuffix,
      mobileMarginBottom,
      mobileMarginBottomSuffix,
      mobileMarginLeft,
      mobileMarginLeftSuffix
    } = v;

    glamorObj = {
      zIndex: zIndex === 0 ? "auto" : zIndex,

      marginTop:
        marginType === "grouped"
          ? margin + marginSuffix
          : marginTop + marginTopSuffix,
      marginRight:
        marginType === "grouped"
          ? margin + marginSuffix
          : marginRight + marginRightSuffix,
      marginBottom:
        marginType === "grouped"
          ? margin + marginSuffix
          : marginBottom + marginBottomSuffix,
      marginLeft:
        marginType === "grouped"
          ? margin + marginSuffix
          : marginLeft + marginLeftSuffix,

      "@media (max-width: 767px)": {
        marginTop:
          mobileMarginType === "grouped"
            ? mobileMargin + mobileMarginSuffix
            : mobileMarginTop + mobileMarginTopSuffix,
        marginRight:
          mobileMarginType === "grouped"
            ? mobileMargin + mobileMarginSuffix
            : mobileMarginRight + mobileMarginRightSuffix,
        marginBottom:
          mobileMarginType === "grouped"
            ? mobileMargin + mobileMarginSuffix
            : mobileMarginBottom + mobileMarginBottomSuffix,
        marginLeft:
          mobileMarginType === "grouped"
            ? mobileMargin + mobileMarginSuffix
            : mobileMarginLeft + mobileMarginSuffix
      }
    };
  }

  const glamorClassName = String(css(glamorObj));

  return classnames("brz-d-xs-flex", "brz-flex-xs-wrap", glamorClassName);
}

export function bgStyleCSSVars(v) {
  if (IS_PREVIEW) return;

  const {
    marginType,
    margin,
    marginSuffix,
    marginTop,
    marginTopSuffix,
    marginRight,
    marginRightSuffix,
    marginBottom,
    marginBottomSuffix,
    marginLeft,
    marginLeftSuffix,
    zIndex,
    mobileMarginType,
    mobileMargin,
    mobileMarginSuffix,
    mobileMarginTop,
    mobileMarginTopSuffix,
    mobileMarginRight,
    mobileMarginRightSuffix,
    mobileMarginBottom,
    mobileMarginBottomSuffix,
    mobileMarginLeft,
    mobileMarginLeftSuffix
  } = v;

  return {
    "--backgroundImage": "none",
    "--backgroundPositionX": "initial",
    "--backgroundPositionY": "initial",
    "--backgroundColor": "transparent",
    "--borderTopWidth": "0",
    "--borderRightWidth": "0",
    "--borderBottomWidth": "0",
    "--borderLeftWidth": "0",
    "--borderColor": "transparent",
    "--borderStyle": "solid",
    "--borderTopLeftRadius": "0",
    "--borderTopRightRadius": "0",
    "--borderBottomLeftRadius": "0",
    "--borderBottomRightRadius": "0",
    "--marginTop":
      marginType === "grouped"
        ? margin + marginSuffix
        : marginTop + marginTopSuffix,
    "--marginRight":
      marginType === "grouped"
        ? margin + marginSuffix
        : marginRight + marginRightSuffix,
    "--marginBottom":
      marginType === "grouped"
        ? margin + marginSuffix
        : marginBottom + marginBottomSuffix,
    "--marginLeft":
      marginType === "grouped"
        ? margin + marginSuffix
        : marginLeft + marginLeftSuffix,
    "--zIndex": zIndex === 0 ? "auto" : zIndex,
    "--mobileBackgroundImage": "none",
    "--mobileBackgroundPositionX": "initial",
    "--mobileBackgroundPositionY": "initial",
    "--mobileBackgroundColor": "transparent",
    "--mobileMarginTop":
      mobileMarginType === "grouped"
        ? mobileMargin + mobileMarginSuffix
        : mobileMarginTop + mobileMarginTopSuffix,
    "--mobileMarginRight":
      mobileMarginType === "grouped"
        ? mobileMargin + mobileMarginSuffix
        : mobileMarginRight + mobileMarginRightSuffix,
    "--mobileMarginBottom":
      mobileMarginType === "grouped"
        ? mobileMargin + mobileMarginSuffix
        : mobileMarginBottom + mobileMarginBottomSuffix,
    "--mobileMarginLeft":
      mobileMarginType === "grouped"
        ? mobileMargin + mobileMarginSuffix
        : mobileMarginLeft + mobileMarginLeftSuffix
  };
}

export function containerStyleClassName(v) {
  const { className } = v;
  let glamorObj;

  if (IS_EDITOR) {
    glamorObj = {
      flex: "1 1 auto",
      marginTop: "var(--itemMarginTop)",
      marginRight: "var(--itemMarginRight)",
      marginBottom: "var(--itemMarginBottom)",
      marginLeft: "var(--itemMarginLeft)",

      ".brz-ed--desktop &": {
        justifyContent: "var(--horizontalAlign)",
        paddingTop: "var(--paddingTop)",
        paddingRight: "var(--paddingRight)",
        paddingBottom: "var(--paddingBottom)",
        paddingLeft: "var(--paddingLeft)"
      },
      ".brz-ed--mobile &": {
        justifyContent: "var(--mobileHorizontalAlign)",
        paddingTop: "var(--mobilePaddingTop)",
        paddingRight: "var(--mobilePaddingRight)",
        paddingBottom: "var(--mobilePaddingBottom)",
        paddingLeft: "var(--mobilePaddingLeft)"
      }
    };
  } else {
    const {
      horizontalAlign,
      paddingType,
      padding,
      paddingSuffix,
      paddingTop,
      paddingTopSuffix,
      paddingRight,
      paddingRightSuffix,
      paddingBottom,
      paddingBottomSuffix,
      paddingLeft,
      paddingLeftSuffix,
      itemPaddingTop,
      itemPaddingRight,
      itemPaddingBottom,
      itemPaddingLeft,
      mobilePaddingType,
      mobilePadding,
      mobilePaddingSuffix,
      mobilePaddingTop,
      mobilePaddingTopSuffix,
      mobilePaddingRight,
      mobilePaddingRightSuffix,
      mobilePaddingBottom,
      mobilePaddingBottomSuffix,
      mobilePaddingLeft,
      mobilePaddingLeftSuffix,
      mobileHorizontalAlign
    } = v;

    glamorObj = {
      justifyContent: aligns[horizontalAlign],
      paddingTop:
        paddingType === "grouped"
          ? padding + paddingSuffix
          : paddingTop + paddingTopSuffix,
      paddingRight:
        paddingType === "grouped"
          ? padding + paddingSuffix
          : paddingRight + paddingRightSuffix,
      paddingBottom:
        paddingType === "grouped"
          ? padding + paddingSuffix
          : paddingBottom + paddingBottomSuffix,
      paddingLeft:
        paddingType === "grouped"
          ? padding + paddingSuffix
          : paddingLeft + paddingLeftSuffix,
      flex: "1 1 auto",
      marginTop: `${-itemPaddingTop}px`,
      marginRight: `${parseFloat(-itemPaddingRight / 2)}px`,
      marginBottom: `${-itemPaddingBottom}px`,
      marginLeft: `${parseFloat(-itemPaddingLeft / 2)}px`,

      "@media (max-width: 767px)": {
        justifyContent: aligns[mobileHorizontalAlign],
        paddingTop:
          mobilePaddingType === "grouped"
            ? mobilePadding + mobilePaddingSuffix
            : mobilePaddingTop + mobilePaddingTopSuffix,
        paddingRight:
          mobilePaddingType === "grouped"
            ? mobilePadding + mobilePaddingSuffix
            : mobilePaddingRight + mobilePaddingRightSuffix,
        paddingBottom:
          mobilePaddingType === "grouped"
            ? mobilePadding + mobilePaddingSuffix
            : mobilePaddingBottom + mobilePaddingBottomSuffix,
        paddingLeft:
          mobilePaddingType === "grouped"
            ? mobilePadding + mobilePaddingSuffix
            : mobilePaddingLeft + mobilePaddingLeftSuffix
      }
    };
  }

  const glamorClassName = String(css(glamorObj));

  return classnames(
    "brz-d-xs-flex brz-flex-xs-wrap",
    glamorClassName,
    className
  );
}

export function containerStyleCSSVars(v) {
  if (IS_PREVIEW) return;

  const {
    horizontalAlign,
    paddingType,
    padding,
    paddingSuffix,
    paddingTop,
    paddingTopSuffix,
    paddingRight,
    paddingRightSuffix,
    paddingBottom,
    paddingBottomSuffix,
    paddingLeft,
    paddingLeftSuffix,
    itemPaddingTop,
    itemPaddingRight,
    itemPaddingBottom,
    itemPaddingLeft,
    mobilePaddingType,
    mobilePadding,
    mobilePaddingSuffix,
    mobilePaddingTop,
    mobilePaddingTopSuffix,
    mobilePaddingRight,
    mobilePaddingRightSuffix,
    mobilePaddingBottom,
    mobilePaddingBottomSuffix,
    mobilePaddingLeft,
    mobilePaddingLeftSuffix,
    mobileHorizontalAlign
  } = v;

  return {
    "--horizontalAlign": aligns[horizontalAlign],
    "--paddingTop":
      paddingType === "grouped"
        ? padding + paddingSuffix
        : paddingTop + paddingTopSuffix,
    "--paddingRight":
      paddingType === "grouped"
        ? padding + paddingSuffix
        : paddingRight + paddingRightSuffix,
    "--paddingBottom":
      paddingType === "grouped"
        ? padding + paddingSuffix
        : paddingBottom + paddingBottomSuffix,
    "--paddingLeft":
      paddingType === "grouped"
        ? padding + paddingSuffix
        : paddingLeft + paddingLeftSuffix,
    "--itemMarginTop": `${-itemPaddingTop}px`,
    "--itemMarginRight": `${parseFloat(-itemPaddingRight / 2)}px`,
    "--itemMarginBottom": `${-itemPaddingBottom}px`,
    "--itemMarginLeft": `${parseFloat(-itemPaddingLeft / 2)}px`,
    "--mobileHorizontalAlign": aligns[mobileHorizontalAlign],
    "--mobilePaddingTop":
      mobilePaddingType === "grouped"
        ? mobilePadding + mobilePaddingSuffix
        : mobilePaddingTop + mobilePaddingTopSuffix,
    "--mobilePaddingRight":
      mobilePaddingType === "grouped"
        ? mobilePadding + mobilePaddingSuffix
        : mobilePaddingRight + mobilePaddingRightSuffix,
    "--mobilePaddingBottom":
      mobilePaddingType === "grouped"
        ? mobilePadding + mobilePaddingSuffix
        : mobilePaddingBottom + mobilePaddingBottomSuffix,
    "--mobilePaddingLeft":
      mobilePaddingType === "grouped"
        ? mobilePadding + mobilePaddingSuffix
        : mobilePaddingLeft + mobilePaddingLeftSuffix
  };
}

export function itemsStyleClassName(v) {
  const { itemClassName } = v;
  let glamorObj;

  if (IS_EDITOR) {
    glamorObj = {
      paddingTop: "var(--itemPaddingTop)",
      paddingRight: "var(--itemPaddingRight)",
      paddingBottom: "var(--itemPaddingBottom)",
      paddingLeft: "var(--itemPaddingLeft)"
    };
  } else {
    const {
      itemPaddingTop,
      itemPaddingRight,
      itemPaddingBottom,
      itemPaddingLeft
    } = v;

    glamorObj = {
      paddingTop: `${itemPaddingTop}px`,
      paddingRight: `${parseFloat(itemPaddingRight / 2)}px`,
      paddingBottom: `${itemPaddingBottom}px`,
      paddingLeft: `${parseFloat(itemPaddingLeft / 2)}px`
    };
  }

  const glamorClassName = String(css(glamorObj));

  return classnames("brz-wrapper-clone__item", glamorClassName, itemClassName);
}

export function itemsStyleCSSVars(v) {
  if (IS_PREVIEW) return;

  const {
    itemPaddingTop,
    itemPaddingRight,
    itemPaddingBottom,
    itemPaddingLeft
  } = v;

  return {
    "--itemPaddingTop": `${itemPaddingTop}px`,
    "--itemPaddingRight": `${parseFloat(itemPaddingRight / 2)}px`,
    "--itemPaddingBottom": `${itemPaddingBottom}px`,
    "--itemPaddingLeft": `${parseFloat(itemPaddingLeft / 2)}px`
  };
}
