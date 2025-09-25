import { useState } from 'react';
import './MatchColumnsAnswer.css';

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

  const [rightItemsOrder] = useState(() => {
    const shuffled = [...rightItems];
    for (let i = 0; i < 3; i++) {
      const idx1 = Math.floor(Math.random() * shuffled.length);
      const idx2 = Math.floor(Math.random() * shuffled.length);
      [shuffled[idx1], shuffled[idx2]] = [shuffled[idx2], shuffled[idx1]];
    }
    return shuffled;
  });

  const handleItemClick = (item, type) => {
    if (showFeedback) return;

    if (!selectedItem) {
      setSelectedItem(item);
      setSelectedType(type);
    } else if (selectedItem === item && selectedType === type) {
      setSelectedItem(null);
      setSelectedType(null);
    } else if (selectedType !== type) {
      const leftItem = selectedType === 'left' ? selectedItem : item;
      const rightItem = selectedType === 'right' ? selectedItem : item;

      const newPairs = { ...userPairs };
      newPairs[leftItem] = rightItem;

      setUserPairs(newPairs);
      onAnswerChange(questionIndex, newPairs);

      setSelectedItem(null);
      setSelectedType(null);
    } else {
      setSelectedItem(item);
      setSelectedType(type);
    }
  };

  const isCorrectMatch = (leftItem, rightItem) => {
    return pairs[leftItem] === rightItem;
  };

  const allAssociationsDone =
    Object.keys(userPairs).length === Object.keys(pairs).length;

  const getLeftItemStatus = (leftItem) => {
    if (!showFeedback || !allAssociationsDone || !userPairs[leftItem])
      return '';
    return isCorrectMatch(leftItem, userPairs[leftItem])
      ? 'correct'
      : 'incorrect';
  };

  const getRightItemStatus = (rightItem) => {
    if (!showFeedback || !allAssociationsDone) return '';
    const associatedLeftItem = Object.keys(userPairs).find(
      (key) => userPairs[key] === rightItem,
    );
    if (!associatedLeftItem) return '';
    return isCorrectMatch(associatedLeftItem, rightItem)
      ? 'correct'
      : 'incorrect';
  };

  return (
    <div className='match-columns-container'>
      <div className='instructions'>
        <p>
          Clique em um item da esquerda e depois em um da direita para
          relacioná-los.
        </p>
        <p className='progress-info'>
          Progresso: {Object.keys(userPairs).length} de{' '}
          {Object.keys(pairs).length} associações
        </p>
        {selectedItem && (
          <p className='selection-hint'>
            Item selecionado: <strong>{selectedItem}</strong>
            {selectedType === 'left' ? ' (esquerda)' : ' (direita)'}
          </p>
        )}
      </div>
      <div className='columns-wrapper'>
        <div className='left-column'>
          <h3 className='column-title'>Relacione</h3>
          {leftItems.map((item) => {
            const isAssociated = Object.keys(userPairs).includes(item);
            const isSelected = selectedItem === item && selectedType === 'left';
            return (
              <div
                key={`left-${item}`}
                className={`left-item ${isSelected ? 'selected' : ''} ${
                  isAssociated ? 'associated' : ''
                } ${getLeftItemStatus(item)}`}
                onClick={() => handleItemClick(item, 'left')}
              >
                <span className='item-text'>{item}</span>
                {isAssociated && (
                  <div className='connection-line'>
                    <span className='arrow'>→</span>
                    <span className='connected-item'>{userPairs[item]}</span>
                  </div>
                )}
                {showFeedback && allAssociationsDone && userPairs[item] && (
                  <span className='feedback-icon'>
                    {isCorrectMatch(item, userPairs[item]) ? '✓' : '✗'}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className='right-column'>
          <h3 className='column-title'>Com</h3>
          {rightItemsOrder.map((item) => {
            const isAssociated = Object.values(userPairs).includes(item);
            const isSelected =
              selectedItem === item && selectedType === 'right';
            return (
              <div key={`right-${item}`} className='right-item-container'>
                <div
                  className={`right-item ${isSelected ? 'selected' : ''} ${
                    isAssociated ? 'associated' : ''
                  } ${getRightItemStatus(item)}`}
                  onClick={() => handleItemClick(item, 'right')}
                >
                  <span className='item-text'>{item}</span>
                  {showFeedback && allAssociationsDone && isAssociated && (
                    <span className='feedback-icon'>
                      {getRightItemStatus(item) === 'correct' ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchColumnsAnswer;
