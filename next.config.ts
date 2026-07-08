import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin'; // 1. Importa o plugin

const withNextIntl = createNextIntlPlugin(); // 2. Inicializa o plugin

const nextConfig: NextConfig = {
  /* config options here */
};

// 3. Envolve a sua configuração atual com o plugin
export default withNextIntl(nextConfig);