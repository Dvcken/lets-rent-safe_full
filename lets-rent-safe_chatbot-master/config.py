import configparser

config = configparser.ConfigParser()
config.read("config.ini")

OPENAI_API_KEY = config['GPT']['openai_api_key']
DATABASE_URL = config['POSTGRES']['postgres_connection_string']