import './About.css';
import PageLayout from '@ui/layout/PageLayout/PageLayout';

const About = () => {
  return (
    <PageLayout backTo='/configuracoes'>
      <main className='main-about'>
        <div className='about-container'>
          <div className='about-header'>
            <h1 className='about-title'>Sobre o TechNinja</h1>
            <div className='about-badge'>
              <span className='badge-icon'>🥷</span>
              <span className='badge-text'>Versão 3.0</span>
            </div>
          </div>

          <div className='about-content'>
            <div className='about-card'>
              <div className='card-icon'>🎯</div>
              <h3 className='card-title'>Nossa Missão</h3>
              <p className='card-text'>
                Fornecer uma plataforma educacional interativa voltada para
                usuários interessados em aprender programação de maneira prática
                e envolvente. Através de quizzes e desafios, os usuários podem
                testar conhecimentos, aprender novos conceitos e acompanhar seu
                progresso de maneira dinâmica.
              </p>
            </div>

            <div className='about-card'>
              <div className='card-icon'>🎓</div>
              <h3 className='card-title'>Projeto Acadêmico</h3>
              <p className='card-text'>
                Iniciativa acadêmica desenvolvida no primeiro semestre de 2024
                pelos alunos da FATEC Diadema. Concebida como parte do curso de
                Desenvolvimento de Sistemas, com foco em tecnologias web e
                experiência do usuário, criando um ambiente de aprendizado
                gamificado e completo.
              </p>
            </div>

            <div className='about-card'>
              <div className='card-icon'>🚀</div>
              <h3 className='card-title'>Tecnologias</h3>
              <p className='card-text'>
                Desenvolvido com React, Node.js e tecnologias modernas para
                proporcionar uma experiência fluida e responsiva. O sistema
                inclui recursos de acessibilidade, gamificação e design
                adaptativo para todos os dispositivos.
              </p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default About;
