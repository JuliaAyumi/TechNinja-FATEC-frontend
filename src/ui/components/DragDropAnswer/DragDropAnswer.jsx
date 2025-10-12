import { useState } from 'react';
import './DragDropAnswer.css';

const DragDropAnswer = ({
  question,
  itemsToRearrange,
  correctAnswer,
  questionIndex,
  userAnswers,
  onAnswerChange,
  showFeedback,
}) => {
  const textParts = question.split('____');
  const numberOfSpaces = textParts.length - 1;

  const [localUserAnswers, setLocalUserAnswers] = useState(() => {
    const existingAnswers = userAnswers[questionIndex];
    if (Array.isArray(existingAnswers)) {
      return existingAnswers;
    }
    return new Array(numberOfSpaces).fill(null);
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const availableItems = itemsToRearrange;

  const handleItemClick = (item) => {
    if (showFeedback) return;

    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const handleSpaceClick = (spaceIndex) => {
    if (showFeedback) return;

    if (localUserAnswers[spaceIndex]) {
      const newAnswers = [...localUserAnswers];
      newAnswers[spaceIndex] = null;
      setLocalUserAnswers(newAnswers);
      onAnswerChange(questionIndex, newAnswers);
    } else if (selectedItem) {
      const newAnswers = [...localUserAnswers];
      const previousIndex = newAnswers.indexOf(selectedItem);
      if (previousIndex !== -1) {
        newAnswers[previousIndex] = null;
      }
      newAnswers[spaceIndex] = selectedItem;
      setLocalUserAnswers(newAnswers);
      onAnswerChange(questionIndex, newAnswers);
      setSelectedItem(null);
    }
  };

  const isCorrectPlacement = (spaceIndex, item) => {
    return correctAnswer[spaceIndex] === item;
  };

  const allSpacesFilled = localUserAnswers.every((item) => item !== null);

  const getSpaceStatus = (spaceIndex) => {
    if (!showFeedback || !allSpacesFilled) return '';
    const item = localUserAnswers[spaceIndex];
    if (!item) return '';
    return isCorrectPlacement(spaceIndex, item)
      ? 'correct-drop'
      : 'incorrect-drop';
  };

  return (
    <div className='drag-drop-container'>
      <div className='instructions'>
        <p>
          Clique em uma palavra para selecioná-la, depois clique no espaço onde
          deseja colocá-la. Pode reorganizar clicando em palavras já usadas.
        </p>
        <p className='progress-info'>
          Progresso: {localUserAnswers.filter(Boolean).length} de{' '}
          {numberOfSpaces} espaços preenchidos
        </p>
        {selectedItem && (
          <p className='selection-hint'>
            Palavra selecionada: <strong>{selectedItem}</strong>
          </p>
        )}
      </div>

      <div className='drop-spaces-container'>
        <h4>Complete os espaços:</h4>
        <div className='spaces-grid'>
          {Array.from({ length: numberOfSpaces }, (_, index) => (
            <div key={index} className='space-item'>
              <span className='space-label'>Espaço {index + 1}:</span>
              <div
                className={`drop-space ${getSpaceStatus(index)} ${
                  selectedItem && !localUserAnswers[index] ? 'available' : ''
                }`}
                onClick={() => handleSpaceClick(index)}
              >
                {localUserAnswers[index] ? (
                  <span className='dropped-item'>
                    {localUserAnswers[index]}
                    {!showFeedback && <span className='remove-icon'>×</span>}
                    {showFeedback && allSpacesFilled && (
                      <span className='feedback-icon'>
                        {isCorrectPlacement(index, localUserAnswers[index])
                          ? '✓'
                          : '✗'}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className='placeholder-text'>
                    {selectedItem
                      ? 'Clique para colocar aqui'
                      : 'Selecione uma palavra'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='draggable-items'>
        <h4 className='items-title'>Palavras disponíveis:</h4>
        <div className='items-container'>
          {availableItems.map((item, index) => {
            const isSelected = selectedItem === item;
            const isUsed = localUserAnswers.includes(item);
            const isDisabled = showFeedback;

            return (
              <div
                key={`${item}-${index}`}
                className={`draggable-item ${isDisabled ? 'disabled' : ''} ${
                  isSelected ? 'selected' : ''
                } ${isUsed ? 'used' : ''}`}
                onClick={() => handleItemClick(item)}
                style={{
                  pointerEvents: isDisabled ? 'none' : 'all',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                {item}
                {isUsed && <span className='used-indicator'>✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {showFeedback && allSpacesFilled && (
        <div className='correct-answer-display'>
          <h4>Palavras corretas:</h4>
          <div className='correct-words-list'>
            {correctAnswer.map((word, index) => (
              <span key={index} className='correct-word-item'>
                Espaço {index + 1}: <strong>{word}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropAnswer;
