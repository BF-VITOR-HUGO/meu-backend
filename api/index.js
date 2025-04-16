const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = "https://api-back-end-alpha.vercel.app"|| 5000;

// process.env.PORT 
// Importando as rotas
const registerRoutes = require("../routes/register");
const ConsultaDocumentos = require("../routes/ConsultarDocumento");
const clienteRoutes = require("../routes/clienteRoutes");
const ConsultaDadosCooperados = require("../routes/ConsultaBancoCooperados");


// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));


// Usando as rotas
app.use("/api", registerRoutes);

app.use("/api/cliente", clienteRoutes);

app.use("/api", ConsultaDocumentos);

app.use("/api", ConsultaDadosCooperados);


// Middleware para servir arquivos estáticos
app.use("/arquivos", express.static(path.join(__dirname, "arquivos")));



// Middleware para tratar erros globais
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Verifica se o erro tem um código de status, caso contrário, usa 500 como padrão
  const statusCode = err.status || 500;

  res.status(statusCode).json({

    message: err.message || "Erro interno no servidor.",
    code: statusCode, // Inclui o código de status
    
  });
});



// Middleware para tratar rotas não encontradas
app.use((req, res) => {

  res.status(404).json({ message: "Rota não encontrada." });

});

// Iniciando o servidor
app.listen(PORT, () => {
  
  console.log(`Servidor rodando na porta ${PORT}`);

});
