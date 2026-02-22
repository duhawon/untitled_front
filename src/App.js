import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import AppRouter from './AppRouter';
import { restoreAuth } from './store/actions/authActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);
  
  return <AppRouter />;
}

export default App;
