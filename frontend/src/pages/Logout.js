
import { redirect } from 'react-router-dom';
import {clearAuthToken} from '../util/Auth';
export const action = () => {
     clearAuthToken();
     return redirect('/');
}