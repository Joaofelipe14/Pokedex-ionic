###  Pokédex Angular Ionic
#### Descrição
Este projeto é uma aplicação desenvolvida em Angular e Ionic, com o propósito de criar uma Pokédex que consome dados da API Pokémons v2. A aplicação é configurada como um Progressive Web App (PWA), possibilitando seu funcionamento offline. Os principais recursos incluem a capacidade de salvar pokémons favoritos localmente, listar todos os pokémons disponíveis e visualizar os detalhes de cada um.
[Preview do projeto](https://pookedexx.netlify.app/home)

# Vídeo de Demonstração

[![Assista ao vídeo](https://img.youtube.com/vi/qUfBSNKTilQ/0.jpg)](https://www.youtube.com/watch?v=qUfBSNKTilQ)


# Instalação e Configuração
1. **Pré-requisitos**:
   - Node.js e npm devem estar instalados na máquina.
   - Angular CLI e Ionic CLI devem ser instalados globalmente: `npm install -g @angular/cli @ionic/cli`

2. **Clone do Repositório**:
   ```
   git clone https://github.com/Joaofelipe14/Pokedex-ionic.git
   cd Pokedex-ionic
   ```

3. **Instalação das Dependências**:
   ```
   npm install
   ```
4. **Executando**:
   ```
   ionic serve
   ```

# Arquitetura
O projeto segue uma arquitetura modular e componentizada, com foco na separação de preocupações e na reutilização de código. Ele é composto por duas páginas principais:

- **Home**: Responsável por listar todos os pokémons disponíveis.
- **Details/:name**: Exibe os detalhes específicos de um pokémon selecionado.

#### Principais Componentes Utilizados
- **Card Pokémon**: Componente responsável por renderizar os detalhes básicos de um Pokémon na lista.
- **Filter Navbar**: Navbar com funcionalidade de filtro para facilitar a busca de pokémons.
- **Shared Module**: Módulo compartilhado que contém componentes reutilizáveis em diferentes partes da aplicação.

#### Services
- **Pokemon service**: Lida com a comunicação com a API Pokémon, possibilitando obter informações sobre os pokémons.
- **Pokemon favotiros**: Gerencia a comunicação com o IndexedDB, permitindo salvar e recuperar dados localmente.

#### Funcionalidades Principais
- Consumo da API Pokémons v2 para obter dados dos pokémons.
- Funcionalidade offline habilitada por meio do Service Worker.
- Persistência de dados local utilizando IndexedDB para salvar os pokémons favoritos do usuário.
- Listagem e detalhamento dos pokémons disponíveis.
- Filtro de pokémons por nome ou tipo na página principal.

# Bibliotecas Utilizadas
- [**Angular**](https://angular.io/) Framework JavaScript para desenvolvimento de aplicações web.
- [**Ionic**](https://ionicframework.com/docs) Plataforma de desenvolvimento de aplicativos móveis híbridos.
- **Angular Service Worker** Utilizado para a configuração do Service Worker e a transformação da aplicação em PWA.
- **RxJS** Biblioteca para programação reativa utilizada para lidar com streams de dados na aplicação.
- **IndexedDB**:  Biblioteca para armazenamento local de dados, utilizada para salvar os pokémons favoritos do usuário no IndexedDB.



