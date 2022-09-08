# Tutorial de como criar APIs testáveis com Node

O melhor jeito de começar a trabalhar numa aplicação é pensar nas entidades,
mas nas entidades a nível de código, e não a nível de banco de dados.
As vezes, essas duas podem ser diferentes, por exemplo, uma mesma tabela de Usuario
pode ter uma classe UsuarioSender e usuarioReceiver no nosso código.

# Definir corretamente o problema e as entidades

Antes de trabalhar numa API, precisamos definir quais serão essas entidades,
conversando com o expert do domínio e entendendo melhor o negócio.

# Entidades, Interfaces, Getters e Setters

No código, criamos entidades e cada uma dessas entidades possui uma interface.
Com essa interface, utilizamos as propriedades e podemos criar getters (para as
propriedades que queremos que sejam acessíveis) e setters (para as propriedades
que queremos que sejam editáveis) e implementar nossas regras nessas funções.

# Testes das entidades

Quando escrevermos nossas entidades, podemos imediatamente escrever testes para elas,
sem instalar nenhum framework ou ORM ainda. No nosso caso, aqui, criamos a entidade
Appointment, que não pode ser criada com datas iguais ou com data de fim menor que
a data de início. Colocamos essa regra no teste e impementamos ela na nossa classe.

# Funcionalidades, UseCases, Requests e Responses

Normalmente são chamadas de use-cases, services, ou de algum outro nome. Elas são
as funcionalidades da nossa aplicação, como o poder do usuário de criar um novo
appointment. Os UseCases são literalmente classes com uma funcionalidade única,
que recebem um request e retornam um response. No nosso caso, o objeto que recebemos
é exatamente igual ao objeto que iremos retornar, mas nem sempre esse é o caso, então
é ideal desestruturamos as propriedades do nosso request.

# Regras de negócios

Até então, falamos de regras de negócio a nível de entidade. Por exemplo,
o fato de não podermos criar um appointment com data início maior que a data fim,
é uma regra de negócio a nível de entidade.
Teremos também regras de negócio a nível de useCases. Por exemplo, não queremos
que exista um agendamento em um horário que já exista um agendamento. Essa é
uma regra de negócio que vem no caso de uso, pois, para saber se um agendamento
conflita com um outro, as informações de um agendamento sozinha não são suficientes.

# In Memory Repositories

Não precisamos do banco em si para criar os testes do nosso useCase. Podemos utilizar
repositórios in memory, ou seja, literalmente arrays contendo objetos que precisamos,
ou seja, no nosso caso, Appointments.
