Projeto: Gerador Automático de Faturas (Micro SaaS)

1. Visão Geral
   Este sistema centraliza e automatiza todo o ciclo de faturamento para freelancers e microempresas, reduzindo o tempo gasto em tarefas administrativas e evitando erros manuais. Ao permitir a criação de faturas detalhadas, geração de documentos em PDF e envio automático, a plataforma garante que o profissional possa focar em seu core business, enquanto o sistema cuida da gestão financeira básica. Além disso, o acompanhamento em tempo real do status de cada fatura e o envio de lembretes automáticos aumentam a taxa de pagamento no prazo.

2. Entidades de Dados

-   **Usuário**: representa o profissional ou empresa que utiliza o sistema. Contém identificador único, credenciais de acesso (e‑mail e senha criptografada) e data de criação da conta. É a raiz de toda hierarquia, pois todas as ações e dados dependem de sua identificação.
-   **Perfil**: armazena informações comerciais do Usuário, como nome da empresa, documento fiscal (CNPJ/CPF), logotipo, endereço completo e telefone. Esses dados são incorporados automaticamente aos templates de fatura e às comunicações por e‑mail.
-   **Cliente**: cada Recipiente de Fatura cadastrado. Inclui identificador, referência ao Usuário, nome do cliente, contatos (e‑mail, telefone) e endereço. Permite agrupar faturas e relatórios por cliente.
-   **Fatura**: entidade principal que reúne o cabeçalho (referência a Usuário e Cliente, número sequencial, datas de emissão e vencimento) e o valor total. Inclui status atual (PENDENTE, ENVIADA ou PAGA) e timestamps de criação/atualização.
-   **Item de Fatura**: linha de detalhamento associada a uma Fatura. Cada item possui descrição, quantidade, preço unitário e subtotal calculado. Contribui para o cálculo automático do total da fatura.
-   **Pagamento**: registro de confirmação de pagamento de uma Fatura, incluindo meio utilizado (ex. transferência bancaria, gateway externo), valor pago, data de liquidação e status (PROCESSANDO, CONCLUIDO, FALHOU). Usado para atualizar o status da Fatura para PAGA.
-   **Notificação**: histórico de lembretes e confirmações enviados. Armazena tipo de notificação (lembrete pré- ou pós-vencimento, confirmação de pagamento), data de envio, canal (e‑mail/SMS) e resultado (sucesso ou erro).
-   **Configuração**: preferencias definidas pelo Usuário para automação. Inclui quantos dias antes e depois do vencimento enviar lembretes, textos padrões de e‑mail e parâmetros de integração (ex. dados de credencial para SMTP e gateways).

3. Fluxo de Dados
4. **Registro e Autenticação**:

    - O Usuário envia e‑mail e senha; o sistema valida formato de e‑mail e força de senha.
    - Criada a conta e enviado e‑mail de confirmação com token.
    - Após confirmação, a conta é ativada e usuário recebe acesso ao dashboard.

5. **Configuração de Perfil**:

    - Usuário preenche dados de Perfil em formulário intuitivo.
    - Dados são validados (ex. formato de CNPJ/CPF, limites de tamanho do logotipo) e armazenados.
    - Informações passam a compor cabeçalhos de fatura e assinaturas de e‑mail.

6. **Cadastro de Clientes**:

    - Usuário acessa módulo de Clientes e cria novos registros com nome, contato e endereço.
    - Backend valida duplicidade de e‑mail e telefone.
    - Lista de clientes é atualizada no frontend, disponível para seleção em faturas.

7. **Criação de Fatura**:

    - Usuário escolhe cliente, define número (sequencial ou customizado) e datas.
    - Adiciona um ou mais Itens de Fatura, preenchendo descrição, quantidade e valor.
    - O sistema calcula subtotais e total, considerando impostos fixos ou variáveis configurados.
    - Fatura é persistida no banco e exibida no dashboard como PENDENTE.

8. **Geração de PDF**:

    - Um serviço converte os dados da Fatura e Perfil em documento PDF usando layout padronizado.
    - PDF é armazenado temporariamente para envio e disponível para download.

9. **Envio de Fatura**:

    - Usuário pode acionar manualmente ou agendar envio automático.
    - O sistema monta e‑mail com template, insere placeholders (nome do cliente, valor, datas) e anexa o PDF.
    - Envio via serviço de e‑mail; resultado gravado em Notificação.

10. **Acompanhamento de Status**:

    - Dashboard mostra faturas agrupadas por status e data.
    - Permite filtrar, buscar e ordenar faturas para facilitar o controle financeiro.

11. **Notificações Automáticas**:

    - Rotina agendada consulta Configuração e identifica faturas próximas ou atrasadas.
    - Envia lembretes pré- e pós-vencimento, registrando cada tentativa em Notificação.

12. **Registro de Pagamento**:

    - Usuário ou webhook de gateway confirma pagamento.
    - Sistema cria registro em Pagamento e atualiza status da Fatura para PAGA.
    - Gera notificação de confirmação e atualiza dashboard.

13. **Relatórios Básicos**:

-   O usuário pode exportar listas de Faturas e Pagamentos em formatos CSV/JSON.
-   Relatórios incluem total faturado por período, faturas pendentes e recebidas.

4. Funcionalidades Principais do MVP

-   **Autenticação de Usuário**: registro com validação de e‑mail e senha, confirmação por token e login seguro.
-   **Gerenciamento de Perfil**: formulário de dados comerciais para personalização de faturas.
-   **CRUD de Clientes**: criação, leitura, atualização e exclusão de registros de clientes.
-   **Criação e Edição de Faturas**: interface dinâmica para itens e cálculos automáticos de valores e impostos.
-   **Geração de PDF de Faturas**: conversão imediata de dados em documento PDF profissional.
-   **Envio de Faturas por E‑mail**: envio manual ou agendado com template editável.
-   **Dashboard de Controle**: visão consolidada de faturas por status, filtros e indicadores de valores.
-   **Notificações de Lembrete**: agendamento e envio automático de lembretes antes e após vencimento.
-   **Registro de Pagamentos**: marcação manual ou automática de faturas como pagas, com histórico de transações.

Observação: este arquivo define apenas o comportamento funcional do sistema, sem referências a tecnologias específicas.

Todos os textos do que aparecem para o usuario devem ser em ingles
