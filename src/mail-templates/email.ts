import { IMaintenceRequest } from 'src/interfaces/MaintenceRequest';

export function sendMessage(request: IMaintenceRequest) {
  return `
  
  
  <html lang='pt-BR'>
  <head>
    <meta charset='UTF-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Frotas Cap</title>
    <script src='https://cdn.tailwindcss.com'></script>
  </head>
  <body>
    <div
      class='w-svw h-full mx-auto flex flex-col gap-3 justify-center items-center'
    >
      <h3 class='text-2xl font-bold text-neutral-800 text-center'>Frota CAP :
        Manutenção de Veículos</h3>
        ${
          request.status === 0
            ? `<div>
        <p class='text-xl font-semibold'>🆕 Seu chamado foi recebido 🆕</p>
        <p>Iremos agendar seu chamado numero: ${request.id}, na oficina!</p>
      </div>`
            : request.status === 1
              ? `<div>
      <p class='text-xl font-semibold'>✴️ Seu chamado está sendo agendado✴️</p>
      <p>Estamos agendando seu chamado numero:
        ${request.id}, na oficina!</p>
    </div>`
              : request.status === 2
                ? ` <div>
    <p class='text-xl font-semibold'>⛔ Encaminhar Veículo para oficina ⛔</p>
    <p>O Veículo deverá ser encaminhado para oficina no dia
      ${request.deadlineToDeviler}.</p>
  </div>`
                : request.status === 3
                  ? `<div>
  <p class='text-xl font-semibold'>⚠️ Veículo chegou na oficina ⚠️</p>
  <p>O Veículo Chegou na Oficina.</p>
</div>`
                  : request.status === 4
                    ? `<div>
<p class='text-xl font-semibold'>📥 Orçamento enviado para aprovação
  📥</p>
<p>Aguardando aprovação do orçamento.</p>
</div>`
                    : request.status === 5
                      ? `<div>
<p class='text-xl font-semibold'>🛠️ Veículo em manutenção 🛠️</p>
<p>Orçamento aprovado, veículo está em manutenção com prazo de entrega
  até
  ${request.deadlineToForward}.</p>
</div>`
                      : request.status === 6
                        ? ` <div>
<p class='text-xl font-semibold'>✅ Veículo Pronto para Retirada ✅</p>
<p>O veículo está pronto para retirada.</p>
</div>`
                        : request.status === 7 &&
                          `<div>
<p class='text-xl font-semibold'>🆗Veículo Retirado🆗</p>
<p>O veículo foi retirado por
  ${request.checkoutBy} as
  ${new Date(request.checkoutAt).toLocaleString('pt-BR')}</p>
</div>`
        }

    </div>
  </body>
</html>
  
  `;
}
