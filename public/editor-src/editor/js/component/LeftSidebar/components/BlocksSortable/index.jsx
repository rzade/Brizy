import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { removeAt, insert } from "timm";
import EditorIcon from "visual/component/EditorIcon";
import {
  pageBlocksAssembledSelector,
  globalBlocksSelector
} from "visual/redux/selectors";
import { removeBlock, reorderBlocks } from "visual/redux/actions2";
import { t } from "visual/utils/i18n";
import { IS_GLOBAL_POPUP } from "visual/utils/models";
import BlockThumbnail from "./BlockThumbnail";

import { getStore } from "visual/redux/store";

const DragHandle = SortableHandle(({ item }) => (
  <BlockThumbnail blockData={item} />
));

const SortableItem = SortableElement(({ item, onRemove }) => {
  // ! TEMP
  const globalBlocksKeys = Object.keys(
    globalBlocksSelector(getStore().getState())
  );
  const className = classnames("brz-ed-sidebar-block-item", {
    "is-condition-block": globalBlocksKeys.includes(item.value._id)
  });

  return (
    <div className={className}>
      <DragHandle item={item} />
      <div className="brz-ed-sidebar-block-remove" onClick={onRemove}>
        <EditorIcon icon="nc-circle-remove-2" className="brz-ed-bar-icon" />
      </div>
    </div>
  );
});

const SortableList = SortableContainer(
  ({ isSorting, items, innerRef, onItemRemove }) => {
    const filteredItems = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.value._blockVisibility === "unlisted") {
        continue;
      }

      filteredItems.push(
        <SortableItem
          key={item.value._id}
          item={item}
          index={i}
          onRemove={() => onItemRemove(i)}
        />
      );
    }

    const className = classnames("brz-ed-sidebar-sortable", {
      "brz-ed-sidebar-sortable--sorting": isSorting
    });

    return (
      <div ref={innerRef} className={className}>
        {filteredItems}
      </div>
    );
  }
);

class DrawerComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // the 'optimistic' flag tells us to keep the state
    // to perform an optimistic update until we get new props.
    // This is why we discard the flag after accepting the state
    if (state.optimistic) {
      return {
        blocks: state.blocks,
        optimistic: false
      };
    }

    if (props.pageBlocks !== state.blocks) {
      return {
        blocks: props.pageBlocks || []
      };
    }

    return null;
  }

  state = {
    blocks: [],
    isSorting: false
  };

  content = React.createRef();

  handleBeforeSortStart = () => {
    this.setState({ isSorting: true });
  };

  getContentWindow = () => {
    return window.parent;
  };

  getContainer = () => {
    const node = this.content.current;

    return node && node.parentElement;
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      // make an optimistic update,
      // after which update the store fo real
      this.setState(
        state => {
          const { blocks } = state;
          const movedBlock = blocks[oldIndex];

          return {
            blocks: insert(removeAt(blocks, oldIndex), newIndex, movedBlock),
            optimistic: true,
            isSorting: false
          };
        },
        () => {
          setTimeout(() => {
            this.props.dispatch(reorderBlocks({ oldIndex, newIndex }));
          }, 100);
        }
      );
    } else {
      this.setState({
        isSorting: false
      });
    }
  };

  handleItemRemove = index => {
    const {
      value: { _id }
    } = this.state.blocks[index];

    this.props.dispatch(removeBlock({ index, id: _id }));
  };

  render() {
    const { blocks, isSorting } = this.state;

    return (
      <SortableList
        helperClass="brz-ed-sidebar-block-item-helper"
        isSorting={isSorting}
        items={blocks}
        distance={5}
        useDragHandle={true}
        innerRef={this.content}
        contentWindow={this.getContentWindow}
        getContainer={this.getContainer}
        onSortStart={this.handleBeforeSortStart}
        onSortEnd={this.handleSortEnd}
        onItemRemove={this.handleItemRemove}
      />
    );
  }
}

const mapStateToProps = state => ({
  pageBlocks: pageBlocksAssembledSelector(state)
});

export const BlocksSortable = {
  id: "blocksSortable",
  icon: "nc-reorder",
  disabled: IS_GLOBAL_POPUP,
  drawerTitle: t("Reorder Blocks"),
  drawerComponent: connect(mapStateToProps)(DrawerComponent)
};
