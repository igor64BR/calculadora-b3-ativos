import pandas as pd
import requests
from bs4 import BeautifulSoup
import time
import re
import json
from urllib.parse import urljoin

def extrair_codigos_csv(arquivo_csv):
    """Extrai os códigos das ações do arquivo CSV"""
    try:
        # Lê o CSV com separador de ponto e vírgula
        df = pd.read_csv(arquivo_csv, sep=';', encoding='utf-8')
        
        # Extrai a coluna de códigos (primeira coluna)
        codigos = df['Codigo'].tolist()
        
        # Remove possíveis valores NaN e converte para string
        return codigos
    except Exception as e:
        print(f"Erro ao ler o arquivo CSV: {e}")
        return []

def extrair_indicadores_investidor10(codigo):
    """Extrai indicadores do site Investidor10"""
    url = f"https://statusinvest.com.br/acao/indicatorhistoricallist?codes={codigo}&time=7"
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Mapeamento de indicadores que queremos extrair
        indicadores_mapeamento = {
            'P/L': 'p_l',
            'P/VP': 'p_vp', 
            'Dividend Yield': 'dy',
            'ROE': 'roe',
            'Crescimento Receita': 'receitas_cagr5',
            'Crescimento Lucro': 'lucros_cagr5'
        }

        # O endpoint retorna JSON, então podemos usar .json()
        indicadores_json = response.json()
        # indicadores_json["data"] é um dicionário com o ticker como chave e uma lista de indicadores como valor
        indicadores_extraidos = {}
        data = indicadores_json.get("data", {})
        for indicadores_lista in data.values():
            for indicador in indicadores_lista:
                key = indicador.get("key")
                # Procura se o key está entre os valores do mapeamento
                for nome, chave in indicadores_mapeamento.items():
                    if key == chave:
                        indicadores_extraidos[chave] = indicador.get("actual")

        time.sleep(1)
        return indicadores_extraidos

        
    except requests.RequestException as e:
        print(f"Erro ao acessar {url}: {e}")
        return {}
    except Exception as e:
        print(f"Erro ao processar dados do Investidor10 para {codigo}: {e}")
        return {}

def extrair_volatilidade_maisretorno(codigo):
    """Extrai volatilidade do site MaisRetorno"""
    url = f"https://maisretorno.com/acoes/{codigo}"
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Busca por elementos que contêm volatilidade
        volatilidade_patterns = [
            re.compile(r'volatilidade', re.IGNORECASE),
            re.compile(r'vol\s*%', re.IGNORECASE),
            re.compile(r'desvio\s*padrão', re.IGNORECASE)
        ]
        
        for pattern in volatilidade_patterns:
            elemento = soup.find(string=pattern)
            if elemento:
                # Busca o valor associado
                parent = elemento.parent
                if parent:
                    valor_elemento = parent.find_next_sibling()
                    if valor_elemento:
                        texto = valor_elemento.get_text()
                        # Extrai número da volatilidade
                        match = re.search(r'(\d+(?:,\d+)?)', texto)
                        if match:
                            try:
                                volatilidade = float(match.group(1).replace(',', '.'))
                                return volatilidade
                            except:
                                continue
        
        return None
        
    except requests.RequestException as e:
        print(f"Erro ao acessar volatilidade para {codigo}: {e}")
        return None
    except Exception as e:
        print(f"Erro ao processar volatilidade para {codigo}: {e}")
        return None

def processar_acoes(arquivo_csv):
    """Função principal que processa todas as ações"""
    print("Extraindo códigos do CSV...")
    codigos = extrair_codigos_csv(arquivo_csv)
    
    if not codigos:
        print("Nenhum código foi encontrado no arquivo CSV.")
        return
    
    print(f"Encontrados {len(codigos)} códigos de ações.")
    
    resultados = []
    
    for i, codigo in enumerate(codigos):
        print(f"Processando {codigo} ({i+1}/{len(codigos)})...")
        
        # Extrai indicadores do Investidor10
        indicadores = extrair_indicadores_investidor10(codigo)
        
        # Extrai volatilidade do MaisRetorno
        volatilidade = extrair_volatilidade_maisretorno(codigo)
        
        # Monta o objeto final
        acao = {
            'ticker': codigo,
            'pl': indicadores.get('p_l', None),
            'pvp': indicadores.get('p_vp', None),
            'dy': indicadores.get('dy', None),
            'roe': indicadores.get('roe', None),
            'crescimento_receita': indicadores.get('receitas_cagr5', None),
            'crescimento_lucro': indicadores.get('lucros_cagr5', None),
            'tipo': 'crescimento',
            'volatilidade': volatilidade
        }

        resultados.append(acao)
        
        # Pausa entre requisições para evitar sobrecarga dos servidores
        # time.sleep(1)
    
    # Imprime o resultado final no formato solicitado
    print("\n" + "="*50)
    print("RESULTADO FINAL:")
    print("="*50)
    print("[")
    for i, acao in enumerate(resultados):
        print("  {")
        for key, value in acao.items():
            if isinstance(value, str):
                print(f"    {key}: '{value}',")
            else:
                print(f"    {key}: {value},")
        if i < len(resultados) - 1:
            print("  },")
        else:
            print("  }")
    print("]")
    
    return resultados

# Execução do script
# Substitua pelo caminho do seu arquivo CSV
arquivo_csv = "SMLLDia_02-07-25.csv"

try:
    resultados = processar_acoes(arquivo_csv)
    
    # Opcionalmente, salva os resultados em um arquivo JSON
    with open('indicadores_acoes.json', 'w', encoding='utf-8') as f:
        json.dump(resultados, f, indent=2, ensure_ascii=False)
    
    print(f"\nResultados também salvos em 'indicadores_acoes.json'")
    
except KeyboardInterrupt:
    print("\nProcesso interrompido pelo usuário.")
except Exception as e:
    print(f"Erro durante a execução: {e}")