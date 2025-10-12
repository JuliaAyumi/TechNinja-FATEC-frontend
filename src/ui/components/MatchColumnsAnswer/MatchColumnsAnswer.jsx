import { useState } from 'react';
import './MatchColumnsAnswer.css';

const COLUMN_TYPES = {
  LEFT: 'left',
  RIGHT: 'right',
};

const MatchColumnsAnswer = ({
  pairs,
  questionIndex,
  userAnswers,
  onAnswerChange,
  showFeedback,
}) => {
  const [userPairs, setUserPairs] = useState(userAnswers[questionIndex] || {});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const leftItems = Object.keys(pairs);

  const rightItems = Object.values(pairs);

  const isAllAssociationsDone =
    Object.keys(userPairs).length === Object.keys(pairs).length;

  const clearSelection = () => {
    setSelectedItem(null);
    setSelectedType(null);
  };

  const selectItem = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  const createAssociation = (leftItem, rightItem) => {
    const newPairs = { ...userPairs, [leftItem]: rightItem };
    setUserPairs(newPairs);
    onAnswerChange(questionIndex, newPairs);
    clearSelection();
  };

  const handleItemClick = (item, type) => {
    if (showFeedback) return;

    const isClickingSameItem = selectedItem === item && selectedType === type;
    const isClickingDifferentColumn = selectedType && selectedType !== type;
    const isFirstSelection = !selectedItem;

    if (isFirstSelection) {
      selectItem(item, type);
    } else if (isClickingSameItem) {
      clearSelection();
    } else if (isClickingDifferentColumn) {
      const leftItem = selectedType === COLUMN_TYPES.LEFT ? selectedItem : item;
      const rightItem =
        selectedType === COLUMN_TYPES.RIGHT ? selectedItem : item;
      createAssociation(leftItem, rightItem);
    } else {
      selectItem(item, type);
    }
  };

  const isCorrectMatch = (leftItem, rightItem) => pairs[leftItem] === rightItem;

  const getItemStatus = (item, isLeftColumn = true) => {
    if (!showFeedback || !isAllAssociationsDone) return '';

    if (isLeftColumn) {
      const associatedItem = userPairs[item];
      if (!associatedItem) return '';
      return isCorrectMatch(item, associatedItem) ? 'correct' : 'incorrect';
    } else {
      const leftItem = Object.keys(userPairs).find(
        (key) => userPairs[key] === item,
      );
      if (!leftItem) return '';
      return isCorrectMatch(leftItem, item) ? 'correct' : 'incorrect';
    }
  };

  const renderLeftColumn = () => (
    <div className='left-column'>
      <h3 className='column-title'>Relacione</h3>
      {leftItems.map((item) => {
        const isAssociated = item in userPairs;
        const isSelected =
          selectedItem === item && selectedType === COLUMN_TYPES.LEFT;
        const statusClass = getItemStatus(item, true);

        return (
          <div
            key={`left-${item}`}
            className={`left-item ${isSelected ? 'selected' : ''} ${
              isAssociated ? 'associated' : ''
            } ${statusClass}`}
            onClick={() => handleItemClick(item, COLUMN_TYPES.LEFT)}
          >
            <span className='item-text'>{item}</span>

            {isAssociated && (
              <div className='connection-line'>
                <span className='connected-item'>{userPairs[item]}</span>
              </div>
            )}

            {showFeedback && isAllAssociationsDone && userPairs[item] && (
              <span className='feedback-icon'>
                {isCorrectMatch(item, userPairs[item]) ? '✓' : '✗'}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderRightColumn = () => (
    <div className='right-column'>
      <h3 className='column-title'>Com</h3>
      {rightItems.map((item) => {
        const isAssociated = Object.values(userPairs).includes(item);
        const isSelected =
          selectedItem === item && selectedType === COLUMN_TYPES.RIGHT;
        const statusClass = getItemStatus(item, false);

        return (
          <div key={`right-${item}`} className='right-item-container'>
            <div
              className={`right-item ${isSelected ? 'selected' : ''} ${
                isAssociated ? 'associated' : ''
              } ${statusClass}`}
              onClick={() => handleItemClick(item, COLUMN_TYPES.RIGHT)}
            >
              <span className='item-text'>{item}</span>

              {showFeedback && isAllAssociationsDone && isAssociated && (
                <span className='feedback-icon'>
                  {statusClass === 'correct' ? '✓' : '✗'}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderInstructions = () => (
    <div className='instructions'>
      <p>
        Clique em um item da esquerda e depois em um da direita para
        relacioná-los.
      </p>

      <p className='progress-info'>
        Progresso: {Object.keys(userPairs).length} de{' '}
        {Object.keys(pairs).length} associações
      </p>
    </div>
  );

  return (
    <div className='match-columns-container'>
      {renderInstructions()}
      <div className='columns-wrapper'>
        {renderLeftColumn()}
        {renderRightColumn()}
      </div>
    </div>
  );
};

export default MatchColumnsAnswer;
