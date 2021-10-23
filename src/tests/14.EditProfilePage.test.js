import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as userAPI from '../services/userAPI';
import renderPath from './helpers/renderPath';
import { defaultUser } from './mocks';

describe('14 - Crie o formulário de edição de perfil', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
  });

  afterEach(() => localStorage.clear());

  

  it('Será validado se após salvar as informações a pessoa é redirecionada para a página de exibição de perfil',
    async () => {
      renderPath("/profile/edit");

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      userEvent.click(screen.getByTestId('edit-button-save'));

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3500 }
      );

      expect(screen.getByText('Editar perfil')).toBeInTheDocument();
      expect(window.location.pathname).toBe('/profile/');
    });
});