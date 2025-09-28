import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19';
import zhCN from 'antd/locale/zh_CN';
import {ConfigProvider} from "antd";
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
const px2rem = px2remTransformer({
    rootValue: 16,
    precision: 5,
    mediaQuery: false
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ConfigProvider locale={zhCN}>
          <StyleProvider transformers={[px2rem]}>
          <App />
          </StyleProvider>
      </ConfigProvider>
  </StrictMode>,
)
