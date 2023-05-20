from kafka import KafkaConsumer

import redis

r = redis.Redis(host="redis1", port=6379, db=0)

servidores_bootstrap = 'kafka:9092'
topic = 'mi_tema'

consumidor = KafkaConsumer(topic, bootstrap_servers=[servidores_bootstrap])

for msg in consumidor:
    print(msg.value)




# from kafka import KafkaConsumer
# consumer = KafkaConsumer('mi_tema')
# for message in consumer:
#     print(message)