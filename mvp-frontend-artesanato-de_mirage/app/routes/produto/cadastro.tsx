import { useState } from "react";
import { Layout } from "../../components/Layout";

export default function CadastroProduto() {
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    preco: "",
    quantidade: "",
    peso: "",
    dimensoes: {
      altura: "",
      largura: "",
      comprimento: "",
    },
    tempoProducao: "",
    materiais: [] as string[],
    cores: [] as string[],
    fotos: [] as File[],
    fotosPreview: [] as string[],
    destaque: false,
    disponivel: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const categoriasOptions = [
    "Decoração",
    "Utilitários",
    "Acessórios",
    "Vestuário",
    "Joias",
    "Brinquedos",
    "Papelaria",
    "Móveis",
    "Outros",
  ];

  const materiaisOptions = [
    "Madeira",
    "Cerâmica",
    "Tecido",
    "Couro",
    "Metal",
    "Vidro",
    "Papel",
    "Pedra",
    "Fibras naturais",
    "Plástico reciclado",
    "Outros",
  ];

  const coresOptions = [
    "Branco",
    "Preto",
    "Vermelho",
    "Azul",
    "Verde",
    "Amarelo",
    "Marrom",
    "Bege",
    "Cinza",
    "Rosa",
    "Roxo",
    "Laranja",
    "Dourado",
    "Prateado",
    "Multicolorido",
  ];

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

  const handleCheckboxArrayChange = (e: React.ChangeEvent<HTMLInputElement>, arrayName: "materiais" | "cores") => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        [arrayName]: [...formData[arrayName], value],
      });
    } else {
      setFormData({
        ...formData,
        [arrayName]: formData[arrayName].filter(item => item !== value),
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newFiles = Array.from(files);
    const newFilesPreview = newFiles.map(file => URL.createObjectURL(file));
    
    setFormData({
      ...formData,
      fotos: [...formData.fotos, ...newFiles],
      fotosPreview: [...formData.fotosPreview, ...newFilesPreview],
    });
  };

  const removeImage = (index: number) => {
    const newFotos = [...formData.fotos];
    const newFotosPreview = [...formData.fotosPreview];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newFotosPreview[index]);
    
    newFotos.splice(index, 1);
    newFotosPreview.splice(index, 1);
    
    setFormData({
      ...formData,
      fotos: newFotos,
      fotosPreview: newFotosPreview,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome do produto é obrigatório";
    if (!formData.categoria) newErrors.categoria = "Categoria é obrigatória";
    if (!formData.descricao.trim()) newErrors.descricao = "Descrição é obrigatória";
    
    if (!formData.preco) {
      newErrors.preco = "Preço é obrigatório";
    } else {
      const precoValue = parseFloat(formData.preco.replace(",", "."));
      if (isNaN(precoValue) || precoValue <= 0) {
        newErrors.preco = "Preço deve ser um valor positivo";
      }
    }
    
    if (!formData.quantidade) {
      newErrors.quantidade = "Quantidade é obrigatória";
    } else {
      const qtdValue = parseInt(formData.quantidade);
      if (isNaN(qtdValue) || qtdValue < 0) {
        newErrors.quantidade = "Quantidade deve ser um valor não negativo";
      }
    }
    
    if (formData.materiais.length === 0) {
      newErrors.materiais = "Selecione pelo menos um material";
    }
    
    if (formData.fotos.length === 0) {
      newErrors.fotos = "Adicione pelo menos uma foto do produto";
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Aqui seria feita a chamada para a API
      console.log("Dados do formulário:", formData);
      setSuccess(true);
      
      // Reset do formulário após sucesso
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
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
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.nome ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ex: Vaso de Cerâmica Pintado à Mão"
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
            </div>
            
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria *
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.categoria ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Selecione uma categoria</option>
                {categoriasOptions.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
              {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria}</p>}
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
                className={`w-full px-3 py-2 border rounded-md ${
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
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.descricao ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Descreva detalhes do produto, técnicas utilizadas, inspiração, etc."
              />
              {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao}</p>}
            </div>
            
            {/* Detalhes do Produto */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-amber-700 mb-4">Detalhes do Produto</h2>
            </div>
            
            <div>
              <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade em Estoque *
              </label>
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.quantidade ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.quantidade && <p className="text-red-500 text-xs mt-1">{errors.quantidade}</p>}
            </div>
            
            <div>
              <label htmlFor="peso" className="block text-sm font-medium text-gray-700 mb-1">
                Peso (em gramas)
              </label>
              <input
                type="number"
                id="peso"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 500"
              />
            </div>
            
            <div>
              <label htmlFor="dimensoes.altura" className="block text-sm font-medium text-gray-700 mb-1">
                Altura (cm)
              </label>
              <input
                type="number"
                id="dimensoes.altura"
                name="dimensoes.altura"
                value={formData.dimensoes.altura}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="dimensoes.largura" className="block text-sm font-medium text-gray-700 mb-1">
                Largura (cm)
              </label>
              <input
                type="number"
                id="dimensoes.largura"
                name="dimensoes.largura"
                value={formData.dimensoes.largura}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="dimensoes.comprimento" className="block text-sm font-medium text-gray-700 mb-1">
                Comprimento (cm)
              </label>
              <input
                type="number"
                id="dimensoes.comprimento"
                name="dimensoes.comprimento"
                value={formData.dimensoes.comprimento}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="tempoProducao" className="block text-sm font-medium text-gray-700 mb-1">
                Tempo de Produção (dias)
              </label>
              <input
                type="number"
                id="tempoProducao"
                name="tempoProducao"
                value={formData.tempoProducao}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 5"
              />
            </div>
            
            {/* Materiais */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-amber-700 mb-4">Materiais e Cores</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materiais Utilizados *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {materiaisOptions.map((material) => (
                    <div key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`material-${material}`}
                        name="materiais"
                        value={material}
                        checked={formData.materiais.includes(material)}
                        onChange={(e) => handleCheckboxArrayChange(e, "materiais")}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`material-${material}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.materiais && <p className="text-red-500 text-xs mt-1">{errors.materiais}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cores
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {coresOptions.map((cor) => (
                    <div key={cor} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`cor-${cor}`}
                        name="cores"
                        value={cor}
                        checked={formData.cores.includes(cor)}
                        onChange={(e) => handleCheckboxArrayChange(e, "cores")}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`cor-${cor}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {cor}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Fotos */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-amber-700 mb-4">Fotos do Produto</h2>
              
              <div className="mb-4">
                <label htmlFor="fotos" className="block text-sm font-medium text-gray-700 mb-1">
                  Adicionar Fotos *
                </label>
                <input
                  type="file"
                  id="fotos"
                  name="fotos"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.fotos ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Você pode selecionar múltiplas fotos. A primeira foto será usada como imagem principal.
                </p>
                {errors.fotos && <p className="text-red-500 text-xs mt-1">{errors.fotos}</p>}
              </div>
              
              {formData.fotosPreview.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Fotos selecionadas:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.fotosPreview.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                            Principal
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Opções adicionais */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-amber-700 mb-4">Opções adicionais</h2>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="destaque"
                    name="destaque"
                    checked={formData.destaque}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="destaque" className="ml-2 block text-sm text-gray-700">
                    Produto em destaque
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="disponivel"
                    name="disponivel"
                    checked={formData.disponivel}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="disponivel" className="ml-2 block text-sm text-gray-700">
                    Produto disponível para venda
                  </label>
                </div>
              </div>
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

