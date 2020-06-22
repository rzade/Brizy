import React from "react";
import { noop } from "underscore";
import classnames from "classnames";
import EditorComponent from "visual/editorComponents/EditorComponent";
import EditorArrayComponent from "visual/editorComponents/EditorArrayComponent";
import { TextEditor } from "visual/component/Controls/TextEditor";
import Toolbar from "visual/component/Toolbar";
import * as toolbarExtendLostPasswordConfig from "./toolbarExtendLostPassword";
import CustomCSS from "visual/component/CustomCSS";
import * as toolbarExtend from "./toolbarExtend";
import * as toolbarExtendParent from "./toolbarExtendParent";
import * as sidebarExtendParent from "./sidebarExtendParent";
import * as toolbarExtendLabel from "./toolbarExtendLabel";
import * as sidebarExtendLabel from "./sidebarExtendLabel";
import * as toolbarExtendCheckbox from "./toolbarExtendCheckbox";
import * as toolbarExtendButton from "visual/editorComponents/Login/toolbarExtendButton";
import * as sidebarExtendButton from "visual/editorComponents/Login/sidebarExtendButton";
import defaultValue from "./defaultValue.json";
import { style } from "./styles";
import { css } from "visual/utils/cssStyle";

class Login extends EditorComponent {
  static get componentId() {
    return "Login";
  }

  static defaultValue = defaultValue;

  static defaultProps = {
    extendParentToolbar: noop
  };

  componentDidMount() {
    const toolbarExtend = this.makeToolbarPropsFromConfig2(
      toolbarExtendParent,
      sidebarExtendParent,
      { allowExtend: false }
    );
    this.props.extendParentToolbar(toolbarExtend);
  }

  handleResizerChange = patch => this.patchValue(patch);

  handleLinkChange = lostPassword => {
    this.patchValue({ lostPassword });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  renderLoginFields(v) {
    const fieldsProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      sliceStartIndex: 0,
      sliceEndIndex: 3,
      itemProps: {
        meta: this.props.meta,
        toolbarExtendLabel: this.makeToolbarPropsFromConfig2(
          toolbarExtendLabel,
          sidebarExtendLabel,
          { allowExtend: false }
        ),
        toolbarExtendCheckbox: this.makeToolbarPropsFromConfig2(
          toolbarExtendCheckbox,
          null,
          { allowExtend: false }
        ),
        toolbarExtend: this.makeToolbarPropsFromConfig2(toolbarExtend, null, {
          allowExtend: false
        }),
        showLabel: v.showLabel,
        showPlaceholder: v.showPlaceholder,
        remember: v.remember
      }
    });
    return (
      <React.Fragment>
        <EditorArrayComponent {...fieldsProps} />
      </React.Fragment>
    );
  }

  renderRegisterFields(v) {
    const fieldsProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      sliceStartIndex: 3,
      sliceEndIndex: 7,
      itemProps: {
        meta: this.props.meta,
        toolbarExtendLabel: this.makeToolbarPropsFromConfig2(
          toolbarExtendLabel,
          sidebarExtendLabel,
          { allowExtend: false }
        ),
        toolbarExtendCheckbox: this.makeToolbarPropsFromConfig2(
          toolbarExtendCheckbox,
          null,
          { allowExtend: false }
        ),
        toolbarExtend: this.makeToolbarPropsFromConfig2(toolbarExtend, null, {
          allowExtend: false
        }),
        showLabel: v.showLabel,
        showPlaceholder: v.showPlaceholder,
        remember: v.remember
      }
    });
    return (
      <React.Fragment>
        <EditorArrayComponent {...fieldsProps} />
      </React.Fragment>
    );
  }

  renderForgotPasswordFields(v) {
    const fieldsProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      sliceStartIndex: 7,
      sliceEndIndex: 8,
      itemProps: {
        meta: this.props.meta,
        toolbarExtendLabel: this.makeToolbarPropsFromConfig2(
          toolbarExtendLabel,
          sidebarExtendLabel,
          { allowExtend: false }
        ),
        toolbarExtendCheckbox: this.makeToolbarPropsFromConfig2(
          toolbarExtendCheckbox,
          null,
          { allowExtend: false }
        ),
        toolbarExtend: this.makeToolbarPropsFromConfig2(toolbarExtend, null, {
          allowExtend: false
        }),
        showLabel: v.showLabel,
        showPlaceholder: v.showPlaceholder,
        remember: v.remember
      }
    });
    return (
      <React.Fragment>
        <EditorArrayComponent {...fieldsProps} />
      </React.Fragment>
    );
  }

  renderButton() {
    const buttonsProps = this.makeSubcomponentProps({
      bindWithKey: "items",
      sliceStartIndex: 8,
      itemProps: {
        meta: this.props.meta,
        toolbarExtend: this.makeToolbarPropsFromConfig2(
          toolbarExtendButton,
          sidebarExtendButton,
          { allowExtend: false }
        )
      }
    });
    return (
      <React.Fragment>
        <div className="brz-form-login__field brz-login__item-button">
          <div className="brz-login__item brz-align-self-xs-end">
            <EditorArrayComponent {...buttonsProps} />
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderLostYourPassword(v) {
    const { lostPassword } = v;
    return (
      <React.Fragment>
        <Toolbar
          {...this.makeToolbarPropsFromConfig2(toolbarExtendLostPasswordConfig)}
        >
          <div className="brz-form-login__field brz-form-login__field-lost-password">
            <a href="#">
              <TextEditor
                value={lostPassword}
                onChange={this.handleLinkChange}
              />
            </a>
          </div>
        </Toolbar>
      </React.Fragment>
    );
  }

  renderLoginForm(v) {
    const { showLostPassword } = v;
    return (
      <React.Fragment>
        {this.renderLoginFields(v)}
        {this.renderButton(v)}
        {showLostPassword === "on" && this.renderLostYourPassword(v)}
      </React.Fragment>
    );
  }

  renderRegisterForm(v) {
    return (
      <React.Fragment>
        {this.renderRegisterFields(v)}
        {this.renderButton(v)}
      </React.Fragment>
    );
  }

  renderForgotForm(v) {
    return (
      <React.Fragment>
        {this.renderForgotPasswordFields(v)}
        {this.renderButton(v)}
      </React.Fragment>
    );
  }

  renderForEdit(v, vs, vd) {
    const { type } = v;
    const className = classnames(
      "brz-login",
      css(
        `${this.constructor.componentId}`,
        `${this.getId()}`,
        style(v, vs, vd)
      )
    );

    const content =
      type === "login"
        ? this.renderLoginForm(v)
        : type === "register"
        ? this.renderRegisterForm(v)
        : type === "forgot"
        ? this.renderForgotForm(v)
        : undefined;

    return (
      <CustomCSS selectorName={this.getId()} css={v.customCSS}>
        <div className={className}>
          <form
            className="brz-form-login"
            noValidate
            onSubmit={this.handleSubmit}
          >
            {content}
          </form>
        </div>
      </CustomCSS>
    );
  }
}

export default Login;
