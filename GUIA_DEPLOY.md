# 🚀 Guia Completo de Deploy - GitHub Pages

## 📋 Passo a Passo

### 1. Execute o Script de Deploy
```powershell
.\deploy-github-pages.ps1
```

### 2. Configurar GitHub Pages (MANUAL)
1. Vá para: https://github.com/SUPERNVX/Cogni/settings/pages
2. Em **"Source"**, selecione **"GitHub Actions"**
3. O workflow já está configurado automaticamente!

### 3. Verificar Deploy
- O site estará disponível em: https://supernvx.github.io/Cogni/
- O deploy acontece automaticamente a cada push na branch `main`

## 🔧 Comandos Úteis

### Deploy Rápido (após configuração inicial)
```powershell
git add .
git commit -m "Suas mudanças aqui"
git push origin main
```

### Build Local para Teste
```powershell
npm run build
npm run preview
```

## ✅ Correções Aplicadas

### Mobile Responsivo
- ✅ Widgets perfeitamente centralizados
- ✅ Spline com zoom out (0.8x tablet, 0.7x mobile)
- ✅ Texto "COGNI IA" não corta mais
- ✅ Padding otimizado para todas as telas

### Performance
- ✅ Build otimizado com chunks separados
- ✅ Assets comprimidos
- ✅ Deploy automático via GitHub Actions

## 🌐 URLs Importantes
- **Repositório**: https://github.com/SUPERNVX/Cogni
- **Site ao vivo**: https://supernvx.github.io/Cogni/
- **Configurações Pages**: https://github.com/SUPERNVX/Cogni/settings/pages

## 🆘 Solução de Problemas

### Se o site não carregar:
1. Verifique se o GitHub Pages está ativo
2. Aguarde 5-10 minutos após o primeiro deploy
3. Verifique se o workflow executou sem erros

### Para mudanças futuras:
1. Faça suas alterações no código
2. Execute: `git add . && git commit -m "sua mensagem" && git push`
3. O site atualiza automaticamente!