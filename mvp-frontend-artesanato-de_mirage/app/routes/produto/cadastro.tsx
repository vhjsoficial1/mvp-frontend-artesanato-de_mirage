import { useState } from "react";
import { Layout } from "../../components/Layout";
import cadastrar from "~/services/produtos/cadastrar";

export default function CadastroProduto() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [erroCadastro, setErroCadastro] = useState({erro: false, mensagem: ""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      });
    } else if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else if (type === "number" || name === "preco") {
      setFormData({
        ...formData,
        [name]: value.replace(/[^0-9.,]/g, ""),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome do produto é obrigatório";
    if (!formData.descricao.trim()) newErrors.descricao = "Descrição é obrigatória";
    
    if (!formData.preco) {
      newErrors.preco = "Preço é obrigatório";
    } else {
      const precoValue = parseFloat(formData.preco.replace(",", "."));
      if (isNaN(precoValue) || precoValue <= 0) {
        newErrors.preco = "Preço deve ser um valor positivo";
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      const response = await cadastrar({
        nome: formData.nome,
        descricao: formData.descricao,
        preco: parseFloat(formData.preco),
        artesaoId: parseInt(localStorage.getItem('id') as string)
      })
      
      console.log("Resposta da API:", response);
      
      if (response.status === '201') {
        setSuccess(true);
        setErroCadastro({erro: false, mensagem: ""});
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setErroCadastro({erro: true, mensagem: response.data.detail});
        setTimeout(() => {
          setSuccess(false);
          setErroCadastro({erro: false, mensagem: ""});
        }, 5000);
      }
    }
  };

  const formatCurrency = (value: string) => {
    // Remove tudo que não for número ou vírgula
    let onlyNums = value.replace(/[^\d,]/g, "");
    
    // Garante que só tem uma vírgula
    const commaCount = (onlyNums.match(/,/g) || []).length;
    if (commaCount > 1) {
      const parts = onlyNums.split(",");
      onlyNums = parts[0] + "," + parts.slice(1).join("");
    }
    
    // Formata como moeda
    if (onlyNums) {
      // Separa parte inteira e decimal
      let [intPart, decPart] = onlyNums.split(",");
      
      // Limita a parte decimal a 2 dígitos
      if (decPart && decPart.length > 2) {
        decPart = decPart.slice(0, 2);
      }
      
      // Adiciona pontos para milhares
      intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
      return `R$ ${intPart}${decPart ? "," + decPart : ""}`;
    }
    
    return "R$ ";
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d,]/g, "");
    const formattedValue = formatCurrency(rawValue);
    
    setFormData({
      ...formData,
      preco: rawValue,
    });
    
    e.target.value = formattedValue;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-amber-800 mb-6">Cadastro de Produto</h1>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p>Produto cadastrado com sucesso!</p>
          </div>
        )}

        {erroCadastro.erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>Erro ao cadastrar produto:</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-amber-700 mb-4">Informações Básicas</h2>
            </div>
            
            <div className="col-span-2">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Produto *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-black ${
                  errors.nome ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ex: Vaso de Cerâmica Pintado à Mão"
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
            </div>
            
            <div>
              <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
                Preço *
              </label>
              <input
                type="text"
                id="preco"
                name="preco"
                onChange={handlePriceChange}
                className={`w-full px-3 py-2 border rounded-md text-black ${
                  errors.preco ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="R$ 0,00"
              />
              {errors.preco && <p className="text-red-500 text-xs mt-1">{errors.preco}</p>}
            </div>
            
            <div className="col-span-2">
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição *
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md text-black ${
                  errors.descricao ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Descreva detalhes do produto, técnicas utilizadas, inspiração, etc."
              />
              {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao}</p>}
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
            >
              Cadastrar Produto
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

