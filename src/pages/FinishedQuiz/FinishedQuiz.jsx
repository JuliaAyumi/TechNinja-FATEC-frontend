import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import HeaderArrowBack from '@ui/layout/HeaderArrowBack/HeaderArrowBack';
import Button from '@ui/components/Button/Button';
import './FinishedQuiz.css';

const FinishedQuiz = () => {
  const [animationPhase, setAnimationPhase] = useState('entering');
  const { area, subtema, dificuldade } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { acertos = 0, totalPerguntas = 0, pontos = 0 } = location.state || {};

  const porcentagemAcerto =
    totalPerguntas > 0 ? (acertos / totalPerguntas) * 100 : 0;

  const getPerformanceLevel = () => {
    if (porcentagemAcerto >= 90) return 'excelente';
    if (porcentagemAcerto >= 70) return 'bom';
    if (porcentagemAcerto >= 50) return 'regular';
    return 'precisa-melhorar';
  };

  const getMotivationalMessage = () => {
    const level = getPerformanceLevel();
    const messages = {
      excelente: [
        'Mandou bem! Você finalizou o quiz com sucesso! 🎉',
        'Incrível! Você é um verdadeiro ninja da programação! 🥷',
        'Perfeito! Seu conhecimento está no próximo nível! 🚀',
      ],
      bom: [
        'Muito bem! Você está no caminho certo! 👏',
        'Ótimo trabalho! Continue assim! 💪',
        'Parabéns! Você tem um bom domínio do assunto! ⭐',
      ],
      regular: [
        'Bom trabalho! Continue praticando para melhorar! 📚',
        'Você está progredindo! Não desista! 💫',
        'Caminho certo! Mais um pouco de estudo e você chegará lá! 🎯',
      ],
      'precisa-melhorar': [
        'Não desanime! Todo ninja começou do básico! 🥋',
        'Continue tentando! A prática leva à perfeição! 💡',
        'Cada erro é uma oportunidade de aprender! 🌱',
      ],
    };

    const levelMessages = messages[level];
    return levelMessages[Math.floor(Math.random() * levelMessages.length)];
  };

  const getPerformanceIcon = () => {
    const level = getPerformanceLevel();
    const icons = {
      excelente: '🏆',
      bom: '🎖️',
      regular: '📈',
      'precisa-melhorar': '💪',
    };
    return icons[level];
  };

  const getBadgeColor = () => {
    const level = getPerformanceLevel();
    const colors = {
      excelente: 'gold',
      bom: 'silver',
      regular: 'bronze',
      'precisa-melhorar': 'iron',
    };
    return colors[level];
  };

  const handleVoltar = () => {
    navigate('/home');
  };

  const handleRefazer = () => {
    navigate(`/quizzes/${area}/${subtema}/${dificuldade}`);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase('showing-ninja'), 500);
    const timer2 = setTimeout(() => setAnimationPhase('showing-message'), 1000);
    const timer3 = setTimeout(() => setAnimationPhase('showing-score'), 1500);
    const timer4 = setTimeout(() => setAnimationPhase('showing-buttons'), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className='finished-quiz-container'>
      <HeaderArrowBack to='/home' />

      <main className='finished-quiz-main'>
        <div className={`ninja-avatar ${animationPhase}`}>
          <div className='ninja-character'>
            <div className='ninja-head'>
              <div className='ninja-mask'></div>
              <div className='ninja-eyes'>
                <div className='eye left'></div>
                <div className='eye right'></div>
              </div>
            </div>
            <div className='ninja-body'>
              <div className='ninja-arms'>
                <div className='arm left'></div>
                <div className='arm right'></div>
              </div>
              <div className='ninja-laptop'></div>
            </div>
          </div>

          <div className='particles'>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`particle particle-${i + 1}`}></div>
            ))}
          </div>
        </div>

        <div className={`motivational-message ${animationPhase}`}>
          <h1>{getMotivationalMessage()}</h1>
        </div>

        <div className={`score-badge ${getBadgeColor()} ${animationPhase}`}>
          <div className='badge-icon'>{getPerformanceIcon()}</div>
          <div className='badge-points'>+{pontos}</div>
        </div>

        <div className={`quiz-stats ${animationPhase}`}>
          <div className='stat-item'>
            <div className='stat-label'>Você acertou</div>
            <div className='stat-value'>
              {acertos}/{totalPerguntas}
            </div>
          </div>

          <div className='performance-ring'>
            <svg className='ring-svg' width='120' height='120'>
              <circle cx='60' cy='60' r='50' className='ring-background' />
              <circle
                cx='60'
                cy='60'
                r='50'
                className='ring-progress'
                style={{
                  strokeDasharray: `${porcentagemAcerto * 3.14} 314`,
                }}
              />
            </svg>
            <div className='ring-percentage'>
              {Math.round(porcentagemAcerto)}%
            </div>
          </div>
        </div>

        <div className={`action-buttons ${animationPhase}`}>
          <Button
            type='secondary'
            option='Refazer Quiz'
            onClick={handleRefazer}
          />
          <Button
            type='action'
            option='Ir para o início'
            onClick={handleVoltar}
          />
        </div>
      </main>
    </div>
  );
};

export default FinishedQuiz;
