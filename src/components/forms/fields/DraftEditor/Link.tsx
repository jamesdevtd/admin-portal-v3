import { CompositeDecorator } from "draft-js";
import React from "react";

import { DraftDecoratorComponentProps } from '@/types/draft-js'

export const DraftLink = (props: DraftDecoratorComponentProps) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a rel="noopener noreferrer" target="_blank" href={url}>
      {props.children}
    </a>
  );
};

export const linkDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
      }, callback);
    },
    component: DraftLink
  }
]);
