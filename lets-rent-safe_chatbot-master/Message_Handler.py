from time import sleep
import os
from openai import OpenAI
from config import OPENAI_API_KEY, DATABASE_URL
import re
import tiktoken
import sqlalchemy as sql
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import inspect
import pandas as pd

Base = declarative_base()
engine = sql.create_engine(DATABASE_URL)

class Data(Base):
    __tablename__ = 'data'
    id = sql.Column(sql.Integer(), primary_key=True)
    name = sql.Column(sql.String(100), nullable=True)
    data = sql.Column(sql.String, nullable=True)
    embedding = sql.Column(sql.ARRAY(sql.Float), nullable=True)

class Postgres:
    engine = sql.create_engine(DATABASE_URL)
    if not inspect(engine).has_table('Data'):
        Base.metadata.create_all(engine)
    engine.connect()
    Session = sessionmaker(bind=engine)
    session = Session()
    data_query = session.query(Data)

class MessageHandler(object):

    def __init__(self):
        self.model = OpenAI(api_key=OPENAI_API_KEY)
        self.model_name = model_name
        ...
    def get_bd(self):
        ...

    def send_to_ChatGPT(self, prompt):
        try:
            # Отправка сообщения боту
            chat_completion = self.model.chat.completions.create(
                messages=[{'role': 'user',
                           'content': prompt}],
                model=self.model_name,
            )
            # Получение ответа от бота
            final_message = chat_completion.choices[0].message.content
            print(final_message)

            # Проверка на ошибку
            if final_message == "Error occurred":
                sleep(21)
            print("bot_response: ", final_message)

        except Exception as e:

            print(f"An error occurred: {e}")
            final_message = "Error occurred"
            print("Sleeping for 21 seconds...")
            sleep(21)  # Если произошла ошибка, спать 21 секунду

        return final_message

if __name__ == "__main__":
    model_name = 'gpt-4o-mini'