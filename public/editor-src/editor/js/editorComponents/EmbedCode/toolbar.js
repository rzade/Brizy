import Config from "visual/global/Config";
import { t } from "visual/utils/i18n";
import { getOptionColorHexByPalette } from "visual/utils/options";
import { hexToRgba } from "visual/utils/color";
import { defaultValueValue } from "visual/utils/onChange";
import { NORMAL, HOVER } from "visual/utils/stateMode";
import { printf } from "visual/utils/string";

export function getItems({ v, device }) {
  const dvv = key => defaultValueValue({ v, key, device });

  const { hex: borderColorHex } = getOptionColorHexByPalette(
    dvv("borderColorHex"),
    dvv("borderColorPalette")
  );

  const { isGuest, isApproved } = Config.get("user");
  const { accountCreate, accountApprove } = Config.get("urls");
  let accountApprovalHTML = "";

  if (TARGET !== "WP" && !isApproved) {
    const linkHref = isGuest ? accountCreate : accountApprove;
    const linkText = isGuest
      ? t("create & validate your account")
      : t("validate your account");
    const paragraphText = printf(
      t("To use this element you must %s"),
      `<a class="brz-a" href="${linkHref}" target="_blank">
        ${linkText}
      </a>`
    );

    accountApprovalHTML = `
      <div style="color: white; text-align: center;">
        <p class="brz-p">
          ${paragraphText}
        </p>
      </div>
    `;
  }

  return [
    {
      id: "popoverCode",
      type: "popover-dev",
      config: {
        icon: "nc-iframe",
        size: "large",
        title: t("Embed")
      },
      devices: "desktop",
      position: 90,
      disabled: TARGET === "WP" ? false : !isApproved,
      options: [
        {
          id: "code",
          type: "textarea-dev",
          devices: "desktop",
          placeholder: t("Paste your code here...")
        }
      ]
    },
    {
      id: "popoverCode2",
      type: "popover",
      icon: "nc-iframe",
      title: t("Embed"),
      roles: ["admin"],
      devices: "desktop",
      position: 90,
      disabled: TARGET === "WP" ? true : isApproved,
      options: [
        {
          id: "approveAccount",
          type: "alert-dev",
          devices: "desktop",
          config: {
            html: accountApprovalHTML
          }
        }
      ]
    },
    {
      id: "popoverColor",
      type: "popover-dev",
      config: {
        size: "auto",
        title: t("Colors"),
        icon: {
          style: {
            backgroundColor: hexToRgba(borderColorHex, v.borderColorOpacity)
          }
        }
      },
      devices: "desktop",
      position: 90,
      options: [
        {
          id: "tabsColor",
          type: "tabs-dev",
          tabs: [
            {
              id: "tabBorder",
              label: t("Border"),
              options: [
                {
                  id: "border",
                  type: "border-dev",
                  states: [NORMAL, HOVER]
                }
              ]
            },
            {
              id: "tabBoxShadow",
              label: t("Shadow"),
              options: [
                {
                  id: "boxShadow",
                  type: "boxShadow-dev",
                  states: [NORMAL, HOVER]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "toolbarSettings",
      type: "popover-dev",
      config: {
        icon: "nc-cog",
        title: t("Settings")
      },
      position: 110,
      options: [
        {
          id: "width",
          label: t("Width"),
          type: "slider-dev",
          config: {
            min: 1,
            max: dvv("widthSuffix") === "px" ? 1000 : 100,
            units: [
              { value: "px", title: "px" },
              { value: "%", title: "%" }
            ]
          }
        },
        {
          id: "advancedSettings",
          type: "advancedSettings",
          label: t("More Settings"),
          icon: "nc-cog",
          devices: "desktop"
        }
      ]
    }
  ];
}
