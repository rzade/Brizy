import { defaultValueKey } from "visual/utils/onChange";
import { capByPrefix } from "visual/utils/string";

export function toolbarDisabledAdvancedSettings({
  device,
  devices = "all",
  state
}) {
  return {
    id: defaultValueKey({ key: "advancedSettings", device, state }),
    type: "advancedSettings",
    devices,
    disabled: true
  };
}

export function toolbarDisabledToolbarSettings({ device, devices = "all" }) {
  return {
    id: defaultValueKey({ key: "toolbarSettings", device }),
    type: "popover",
    devices,
    disabled: true
  };
}

export function toolbarDisabledMedia({ device, state, devices = "all" }) {
  const dvk = key => defaultValueKey({ key, device, state });

  return {
    id: dvk("toolbarMedia"),
    type: "popover",
    devices,
    disabled: true
  };
}

export function toolbarDisabledShowOnTablet({ devices = "responsive" }) {
  return {
    id: "showOnTablet",
    type: "toggle",
    disabled: true,
    devices
  };
}

export function toolbarDisabledShowOnMobile({ devices = "responsive" }) {
  return {
    id: "showOnMobile",
    type: "toggle",
    disabled: true,
    devices
  };
}

export function toolbarDisabledLink({ device, devices = "all" }) {
  return {
    id: defaultValueKey({ key: "toolbarLink", device }),
    type: "popover",
    devices,
    disabled: true
  };
}

export function toolbarDisabledShowOnResponsive({ device }) {
  let r;
  if (device === "tablet") {
    r = toolbarDisabledShowOnTablet({});
  } else if (device === "mobile") {
    r = toolbarDisabledShowOnMobile({});
  } else {
    r = {};
  }

  return r;
}

export function toolbarDisabledDuplicate({ device, devices = "all" }) {
  return {
    id: defaultValueKey({ key: "duplicate", device }),
    type: "button",
    devices,
    disabled: true
  };
}

export function toolbarDisabledRemove({ device, devices = "all" }) {
  return {
    id: defaultValueKey({ key: "remove", device }),
    type: "button",
    devices,
    disabled: true
  };
}

export function toolbarDisabledPadding({
  device,
  state,
  prefix = "",
  devices = "all"
}) {
  const dvk = key => defaultValueKey({ key, device, state });
  const padding = capByPrefix(prefix, "padding");

  return {
    devices,
    id: dvk(padding),
    type: "multiPicker",
    disabled: true
  };
}

export function toolbarDisabledMargin({ devices = "all" }) {
  return {
    id: "margin",
    devices,
    type: "group-dev",
    disabled: true
  };
}
