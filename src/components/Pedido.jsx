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

  return (
    <>
      
    </>
  )
}

 export default Pedido
