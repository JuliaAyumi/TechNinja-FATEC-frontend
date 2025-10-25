import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import PageLayout from '@ui/layout/PageLayout/PageLayout';
import useUserData from '@hooks/UseUserData';
import useUserUpdate from '@hooks/UseUserUpdate';
import Form from '@ui/components/Form/Form';
import Button from '@ui/components/Button/Button';
import './PerfilConfiguracoes.css';

const PerfilConfiguracoes = () => {
  const tokenString = localStorage.getItem('user');
  const tokenArray = JSON.parse(tokenString);
  const token = tokenArray[0];

  const { userData, loading, refetch } = useUserData(token);

  useEffect(() => {
    const handleUserDataUpdate = () => {
      refetch();
    };

    window.addEventListener('userDataUpdated', handleUserDataUpdate);

    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, [refetch]);

  const {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    setAvatar,
    handleSubmit,
  } = useUserUpdate(userData, token);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageLayout backTo='/configuracoes'>
      <main className='main-perfil-configuracoes'>
        <form
          className='perfil-configuracoes-container'
          onSubmit={handleSubmit}
        >
          <h3>Nome</h3>
          <Form
            type='text'
            id='nome'
            value={loading ? 'Carregando...' : nome}
            onChange={(e) => setNome(e.target.value)}
            required
            disabled={loading}
          />

          <h3>E-mail</h3>
          <Form
            type='email'
            id='email'
            value={loading ? 'Carregando...' : email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <h3>Senha</h3>
          <Form
            type='password'
            id='senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder='Digite nova senha (opcional)'
          />

          <h3>Avatar</h3>
          <Form
            type='file'
            id='avatar'
            accept='image/*'
            onChange={handleFileChange}
          />

          <Button
            type='action'
            size='large'
            option='Salvar'
            buttonType='submit'
            disabled={loading}
          />
        </form>
        <Toaster />
      </main>
    </PageLayout>
  );
};

export default PerfilConfiguracoes;
