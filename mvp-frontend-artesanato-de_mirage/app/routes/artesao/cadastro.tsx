import { useState } from "react";
import { Layout } from "../../components/Layout";

export default function CadastroArtesao() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
    biografia: "",
    endereco: {
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    especialidades: [] as string[],
    redesSociais: {
      instagram: "",
      facebook: "",
      site: "",
    },
    termos: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const especialidadesOptions = [
    "Cerâmica",
    "Madeira",
    "Tecido",
    "Couro",
    "Vidro",
    "Metal",
    "Papel",
    "Pedra",
    "Outros",
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
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleEspecialidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        especialidades: [...formData.especialidades, value],
      });
    } else {
      setFormData({
        ...formData,
        especialidades: formData.especialidades.filter(item => item !== value),
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.cpf.trim()) newErrors.cpf = "CPF é obrigatório";
    else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = "CPF inválido (formato: 000.000.000-00)";
    }
    
    if (!formData.senha) newErrors.senha = "Senha é obrigatória";
    else if (formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
    }
    
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }
    
    if (!formData.endereco.cep.trim()) newErrors["endereco.cep"] = "CEP é obrigatório";
    if (!formData.endereco.rua.trim()) newErrors["endereco.rua"] = "Rua é obrigatória";
    if (!formData.endereco.numero.trim()) newErrors["endereco.numero"] = "Número é obrigatório";
    if (!formData.endereco.bairro.trim()) newErrors["endereco.bairro"] = "Bairro é obrigatório";
    if (!formData.endereco.cidade.trim()) newErrors["endereco.cidade"] = "Cidade é obrigatória";
    if (!formData.endereco.estado.trim()) newErrors["endereco.estado"] = "Estado é obrigatório";
    
    if (formData.especialidades.length === 0) {
      newErrors.especialidades = "Selecione pelo menos uma especialidade";
    }
    
    if (!formData.termos) {
      newErrors.termos = "Você precisa aceitar os termos de uso";
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

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const formatTelefone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value);
    setFormData({
      ...formData,
      cpf: formattedValue,
    });
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCEP(e.target.value);
    setFormData({
      ...formData,
      endereco: {
        ...formData.endereco,
        cep: formattedValue,
      },
    });
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatTelefone(e.target.value);
    setFormData({
      ...formData,
      telefone: formattedValue,
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-amber-800 mb-6">Cadastro de Artesão</h1>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p>Cadastro realizado com sucesso! Em breve você receberá um email de confirmação.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Pessoais */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-amber-700 mb-4">Informações Pessoais</h2>
            </div>
            
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
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
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone *
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleTelefoneChange}
                placeholder="(00) 00000-0000"
                maxLength={15}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.telefone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
            </div>
            
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                CPF *
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleCPFChange}
                placeholder="000.000.000-00"
                maxLength={14}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.cpf ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
            </div>
            
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                Senha *
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.senha ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha *
              </label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.confirmarSenha ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmarSenha && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmarSenha}</p>
              )}
            </div>
            
            <div className="col-span-2">
              <label htmlFor="biografia" className="block text-sm font-medium text-gray-700 mb-1">
                Biografia / Sobre você
              </label>
              <textarea
                id="biografia"
                name="biografia"
                value={formData.biografia}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Conte um pouco sobre você, sua história com o artesanato e suas inspirações..."
              />
            </div>
            
            {/* Endereço */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-amber-700 mb-4">Endereço</h2>
            </div>
            
            <div>
              <label htmlFor="endereco.cep" className="block text-sm font-medium text-gray-700 mb-1">
                CEP *
              </label>
              <input
                type="text"
                id="endereco.cep"
                name="endereco.cep"
                value={formData.endereco.cep}
                onChange={handleCEPChange}
                placeholder="00000-000"
                maxLength={9}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["endereco.cep"] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors["endereco.cep"] && (
                <p className="text-red-500 text-xs mt-1">{errors["endereco.cep"]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endereco.estado" className="block text-sm font-medium text-gray-700 mb-1">
                Estado *
              </label>
              <select
                id="endereco.estado"
                name="endereco.estado"
                value={formData.endereco.estado}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["endereco.estado"] ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
              {errors["endereco.estado"] && (
                <p className="text-red-500 text-xs mt-1">{errors["endereco.estado"]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endereco.cidade" className="block text-sm font-medium text-gray-700 mb-1">
                Cidade *
              </label>
              <input
                type="text"
                id="endereco.cidade"
                name="endereco.cidade"
                value={formData.endereco.cidade}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["endereco.cidade"] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors["endereco.cidade"] && (
                <p className="text-red-500 text-xs mt-1">{errors["endereco.cidade"]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endereco.bairro" className="block text-sm font-medium text-gray-700 mb-1">
                Bairro *
              </label>
              <input
                type="text"
                id="endereco.bairro"
                name="endereco.bairro"
                value={formData.endereco.bairro}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["endereco.bairro"] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors["endereco.bairro"] && (
                <p className="text-red-500 text-xs mt-1">{errors["endereco.bairro"]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endereco.rua" className="block text-sm font-medium text-gray-700 mb-1">
                Rua *
              </label>
              <input
                type="text"
                id="endereco.rua"
                name="endereco.rua"
                value={formData.endereco.rua}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["endereco.rua"] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors["endereco.rua"] && (
                <p className="text-red-500 text-xs mt-1">{errors["endereco.rua"]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endereco.numero" className="block text-sm font-medium text-gray-700 mb-1">
                Número *
              </label>
              <input
                type="text"
                id="endereco.numero"
                name="endereco.numero"
                value={formData.endereco.numero}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors["endereco.numero"] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors["endereco.numero"] && (
                <p className="text-red-500 text-xs mt-1">{errors["endereco.numero"]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endereco.complemento" className="block text-sm font-medium text-gray-700 mb-1">
                Complemento
              </label>
              <input
                type="text"
                id="endereco.complemento"
                name="endereco.complemento"
                value={formData.endereco.complemento}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            {/* Especialidades */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-amber-700 mb-4">Especialidades</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {especialidadesOptions.map((especialidade) => (
                  <div key={especialidade} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`especialidade-${especialidade}`}
                      name="especialidades"
                      value={especialidade}
                      checked={formData.especialidades.includes(especialidade)}
                      onChange={handleEspecialidadeChange}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`especialidade-${especialidade}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {especialidade}
                    </label>
                  </div>
                ))}
              </div>
              {errors.especialidades && (
                <p className="text-red-500 text-xs mt-1">{errors.especialidades}</p>
              )}
            </div>
            
            {/* Redes Sociais */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold text-amber-700 mb-4">Redes Sociais</h2>
            </div>
            
            <div>
              <label htmlFor="redesSociais.instagram" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                  @
                </span>
                <input
                  type="text"
                  id="redesSociais.instagram"
                  name="redesSociais.instagram"
                  value={formData.redesSociais.instagram}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-r-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="redesSociais.facebook" className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="text"
                id="redesSociais.facebook"
                name="redesSociais.facebook"
                value={formData.redesSociais.facebook}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="URL do seu perfil ou página"
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="redesSociais.site" className="block text-sm font-medium text-gray-700 mb-1">
                Site ou Loja Virtual
              </label>
              <input
                type="text"
                id="redesSociais.site"
                name="redesSociais.site"
                value={formData.redesSociais.site}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://"
              />
            </div>
            
            {/* Termos e Condições */}
            <div className="col-span-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termos"
                    name="termos"
                    type="checkbox"
                    checked={formData.termos}
                    onChange={(e) => setFormData({ ...formData, termos: e.target.checked })}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termos" className="font-medium text-gray-700">
                    Concordo com os <a href="#" className="text-amber-600 hover:text-amber-500">Termos de Uso</a> e <a href="#" className="text-amber-600 hover:text-amber-500">Política de Privacidade</a> *
                  </label>
                  {errors.termos && <p className="text-red-500 text-xs mt-1">{errors.termos}</p>}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

