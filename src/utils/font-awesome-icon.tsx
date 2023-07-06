import { FunctionalComponent, h } from '@stencil/core';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';

export const FontAwesomeIcon: FunctionalComponent<{ icon: IconDefinition }> = props => {
  const width = props.icon.icon[0];
  const height = props.icon.icon[1];
  const iconPathData = props.icon.icon[4];

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      {Array.isArray(iconPathData) ? (
        iconPathData.map(path => <path d={path as string} />)
      ) : (
        <path d={iconPathData as string} />
      )}
    </svg>
  );
};
