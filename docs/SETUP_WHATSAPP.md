# Configuração de Autenticação WhatsApp (OTP) com Supabase

Para validar números de WhatsApp enviando um código (OTP), o Supabase utiliza a infraestrutura do provedor **Phone**. Atualmente, a integração oficial recomendada para envio via WhatsApp é através do **Twilio**.

Este guia descreve como configurar essa integração.

## Pré-requisitos

1.  Uma conta no **Twilio** (twilio.com).
2.  Uma conta no **Supabase**.

## Passo 1: Configurar Twilio para WhatsApp

1.  Crie ou acesse sua conta **Twilio**.
2.  Obtenha um número de telefone com capacidade de WhatsApp (ou use o Sandbox para testes).
3.  No Dashboard do Twilio, anote suas credenciais:
    *   **Account SID**
    *   **Auth Token**
    *   **Message Service SID** (Se estiver usando Messaging Service).

## Passo 2: Configurar Supabase

1.  Acesse o Dashboard do seu projeto no Supabase.
2.  Vá em **Authentication** > **Providers**.
3.  Selecione **Phone** (Telefone).
4.  Ative o provedor ("Enable Phone provider").
5.  Em **SMS Provider**, selecione **Twilio**.
6.  Preencha os campos com as credenciais do Twilio obtidas no Passo 1:
    *   **Twilio Account SID**
    *   **Twilio Auth Token**
    *   **Twilio Message Service SID**
7.  Clique em **Salvar**.

## Passo 3: Ajuste no Código (Importante)

Para que o Supabase entenda que o OTP deve ser enviado via WhatsApp e não SMS, o código deve especificar o canal. O código implementado em `AuthPage.tsx` já faz isso:

```typescript
const { error } = await supabase.auth.signInWithOtp({
  phone: '+55...',
  options: {
    channel: 'whatsapp', // <--- Isso instrui o uso do canal WhatsApp
  },
})
```

## Notas sobre Testes (Sandbox) e Produção

*   **Twilio Sandbox**: Se você estiver usando o ambiente de testes do Twilio (Sandbox), você precisará primeiro entrar na Sandbox enviando uma mensagem específica do WhatsApp do seu celular para o número do Twilio. Caso contrário, o envio do OTP falhará.
*   **Produção**: Para enviar mensagens via WhatsApp em produção, você precisará aprovar sua conta Business no Facebook (através do Twilio) e registrar templates de mensagem. O corpo da mensagem OTP é geralmente padronizado, mas verifique as restrições de template do Twilio.

---

### Alternativa: "Sign in with WhatsApp" (Social Login)

Se você estava procurando um botão "Entrar com WhatsApp" que redireciona para o app do WhatsApp/Facebook (sem digitar código), isso é o "Social Login". No entanto, o fluxo que implementamos é o **OTP** (código de verificação), que oferece uma experiência mais fluida sem sair da tela de login para muitos casos de uso.
- Se o "WhatsApp" não aparece na lista de provedores Social, é porque o Supabase pode agrupá-lo ou exigir configuração via **Facebook** provider em alguns casos, ou o recurso pode estar em Beta limitado. Mas para **OTP**, o caminho é via **Phone > Twilio**.
