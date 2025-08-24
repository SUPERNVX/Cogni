# 🚀 Script de Deploy para GitHub Pages
# Execute este script para fazer deploy completo

Write-Host "🚀 Iniciando configuração do GitHub Pages..." -ForegroundColor Green

# 1. Verificar se estamos no repositório correto
Write-Host "📍 Verificando repositório..." -ForegroundColor Yellow
git remote -v

# 2. Build do projeto
Write-Host "📦 Fazendo build do projeto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build! Verifique os erros acima." -ForegroundColor Red
    exit 1
}

# 3. Adicionar todas as mudanças
Write-Host "📝 Adicionando mudanças..." -ForegroundColor Yellow
git add .

# 4. Commit
Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
git commit -m "Deploy inicial: site com correções mobile e Spline otimizado"

# 5. Push para main
Write-Host "🔄 Enviando para repositório..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host "" 
Write-Host "🌐 PRÓXIMOS PASSOS MANUAIS:" -ForegroundColor Cyan
Write-Host "1. Vá para: https://github.com/SUPERNVX/Cogni/settings/pages" -ForegroundColor White
Write-Host "2. Em 'Source', selecione 'GitHub Actions'" -ForegroundColor White
Write-Host "3. Clique em 'Configure' no template 'Static HTML'" -ForegroundColor White
Write-Host "4. Substitua o conteúdo pelo workflow que vou criar" -ForegroundColor White
Write-Host ""
Write-Host "📱 Correções aplicadas:" -ForegroundColor Green
Write-Host "• Widgets centralizados no mobile ✓" -ForegroundColor White
Write-Host "• Spline com zoom out para evitar corte ✓" -ForegroundColor White
Write-Host "• Responsividade otimizada ✓" -ForegroundColor White