## [j11c205.p.ssafy.io](http://j11c205.p.ssafy.io) (EC2_1)

### [spark-env.sh](http://spark-env.sh)

```bash

SPARK_MASTER_WEBUI_PORT=7070
SPARK_WORKER_WEBUI_PORT=7071

export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export SPARK_MASTER_IP=j11c205.p.ssafy.io
export SPARK_WORKER_MEMORY=8g
export SPARK_WORKER_CORES=4
export HADOOP_CONF_DIR=/usr/local/hadoop/etc/hadoop
export SPARK_LOCAL_DIRS=/var/spark/tmp
export YARN_CONF_DIR=/usr/local/hadoop/etc/hadoop
export SPARK_MASTER_PORT=7077
```

### 실행명령어

```bash
$SPARK_HOME/sbin/start-master.sh //maseter 실행
$SPARK_HOME/sbin/start-slaves.sh //worker 실행
```

## [j11c205a.p.ssafy.io](http://j11c205.p.ssafy.io) (EC2_2)

### [spark-env.sh](http://spark-env.sh)

```bash

export SPARK_WORKER_MEMORY=8g
export SPARK_WORKER_CORES=4
export SPARK_MASTER_URL=spark://j11c205.p.ssafy.io:7077
```

### 실행명령어

```bash
/opt/spark/sbin/start-worker.sh spark://j11c205.p.ssafy.io:7077
```

### kafka에서 하둡으로 옮기는 명령어

```bash
nohup spark-submit --master spark://j11c205.p.ssafy.io:7077 --total-executor-cores 2 --executor-cores 2 --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0 /home/ubuntu/KafkaToHadoop.py  > spark_job.log 2>&1 &
```

### spark에서 유사도 계산 실행 명령어

```bash
spark-submit   --master spark://j11c205.p.ssafy.io:7077   --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0,org.apache.kafka:kafka-clients:2.8.0   --py-files /home/ubuntu/kafka_2.13-3.4.0/deps.zip   --num-executors 2   --executor-cores 2   /home/ubuntu/CosineSimilarityCalculator.py
```

```bash
http://j11c205.p.ssafy.io:4040
```

### spark 껐다 키기

```bash

$SPARK_HOME/sbin/stop-all.sh
$SPARK_HOME/sbin/start-all.sh

```

## Jupyter

### 실행명령어

```bash
nohup jupyter notebook --no-browser --port=8888 > jupyter.log 2>&1 & //백그라운드
jupyter notebook //그냥 실행

```