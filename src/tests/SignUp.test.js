import { render, fireEvent, waitFor, screen, getDefaultNormalizer } from '@testing-library/react';
import SignUp from '../modules/SignUp';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { BrowserRouter } from 'react-router-dom';

const server = setupServer(
    rest.post('/v1/user/sign-up', (req, res, ctx) => {
        req.body = {
            name: 'go434234sia',
            email: 'gosia345rr654w56@gmail.com',
            password: 'Haslo12345'
        }
        // return res(ctx.json({ greeting: 'hello there' }))
        return res(ctx.status(201))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('should be confirmed', async () => {
    render(<SignUp />);

    fireEvent.change(screen.getByTestId('userName'), { target: { value: 'goe33u8rsi6f6552a123' } })
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'gosisfsa3664rgg2ry8t45sfdssdf9994w56@gmail.com' } })
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Hasloj023245' } })
    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled(), {
        timeout: 5000,
      });
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => screen.getByTestId('congr'))

    expect(screen.getByTestId('congr')).toHaveTextContent('Congratulations!')

});

test('handles server error', async () => {
    server.use(
        rest.get('/v1/user/sign-up', (req, res, ctx) => {
            return res(ctx.status(409))
        })
    )

    render(<SignUp />);
    fireEvent.change(screen.getByTestId('userName'), { target: { value: 'gosia123' } })
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'gosia3tddyryt4565sdfsf4w5@gmail.com' } })
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Haslo12345' } })

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => screen.getByText('The user with such email already signed up.'))

    expect(screen.getByText('The user with such email already signed up.')).toHaveTextContent('The user with such email already signed up.')

});