import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';

import router from '@/router';

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
              padding: 24,
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </Suspense>
    </>
  );
}

export default App;
