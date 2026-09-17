import {useState, useEffect} from 'react'

//Array de objetoscontendo o estado inicial do cardápio.
const cardapio = [
    {id:1, nome:"Big-Mac", preco:25.00, disponivel:true, quantidade:0},
    {id:2, nome:"McFish", preco:30.00, disponivel:true, quantidade:0},
    {id:3, nome:"Mc Lanche Feliz", preco:35.00, disponivel:false, quantidade:0},
    {id:4, nome:"Quarteirão", preco:40.00, disponivel:true, quantidade:0},
]


const Pedido = () => {

    //HOOK - useState- Manipula o estado da variável
    //Exemplos vai gerenciar a lista de itens o cardapio
    const [itens, setItens] = useState(cardapio);
    const [status, setStatus] = useState("");
    const [enviar, setEnviar] = useState(false);

    //valor fixo adicionado ao total quando tiver itens no carrinho
    const taxaEntrega = 5.00;

    //função que altera a quantidade do pedido
    const AlterarQuantidade =(id, valor) => {
        setItens(prev =>
            //Map percorre a lista para criar um novo array sem modificar o original
            prev.map(item =>
                //Ternário verifica se o item da iteração atual é o que deve ser alterado
                //Spread (...item) adiciona o item a lista atual ou modifica
                //Math.max garante que a quantidade nunca seja menor que 0
                //item retorna o item intatcto casa o id seja diferente
                item.id === id ? {...item, quantidade:Math.max(0, item.quantidade + valor)} : item
            )
        )
    }

    //Filter seleciona apenas os produtos disponíveis e do carrinho
    const produtosDisponiveis = itens.filter(item => item.disponivel);
    const carrinho = itens.filter(item => item.quantidade > 0);

    //Reduce calcula a soma dos itens (preço * quantidade) e adiciona à taxa de entrega
    const subTotal = carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0)
    const total = subTotal > 0 ? subTotal + taxaEntrega : 0;

    //SIMULAÇÃO DO CICLO DE VIDA DA ENTREGA USANDO TEMPORIZADORES ASSÍNCRONOS
    const ConfirmarPedido = () => {
        setEnviar(true);
        setStatus ("Restaurante Preparando seu Pedido");
        setTimeout(() => {
            setStatus("Seu pedido saiu para entrega!")
            setEnviar(false);
        }, 5000) // 5 segundos
        setTimeout(() => {
            setStatus("Seu Pedido foi entregue com sucesso.")
            setEnviar(false);
        }, 10000) // 10 segundos
    }

  return (
    <div>
        <h1>Cardápio do Restaurante</h1>
        {produtosDisponiveis.map(produto => (
            <div key = {produto.id}>
                <span>{produto.nome} (R${produto.preco.toFixed(2)})</span>
                <div>
                    <button onClick={() => AlterarQuantidade(produto.id, -1)}>-</button>
                    <span>{produto.quantidade}</span>
                    <button onClick={() => AlterarQuantidade(produto.id, +1)}>+</button>
                </div>
            </div>
        ))}

        <hr></hr>

        <h3>Resumo da Enrega</h3>
        {carrinho.length === 0 ? (
            <p>Seu Carrinho está vazio</p>
        ) : (
            <>
            <ul>
                {carrinho.map(item => (
                    <li key={item.id}>
                        {item.quantidade}X {item.nome} -R${(item.quantidade * item.preco).toFixed(2)}
                    </li>
                ))}
            </ul>

            <p>SubTotal R${subTotal.toFixed(2)}</p>
            <p>Taxa de Entrega: R${taxaEntrega.toFixed(2)}</p>
            <p>Total R${total.toFixed(2)}</p>
            
            <button onClick={ConfirmarPedido} disabled= {enviar}>
                {enviar ? "Enviando..." : "Confirmar Pedido"}
            </button>
            </>
        )}
        {status && (
            <div>
                <strong>Alerta:</strong> {status}
            </div>
        )}

    </div>
  )
}

 export default Pedido
