## namenode가 있는 EC2 (j11c205a.p.ssafy.io (EC2_2))

- /usr/local/hadoop/etc/hadcoop/hdfs-site.xml
    ```
    <configuration>
        <property>
            <name>dfs.namenode.datanode.registration.ip-hostname-check</name>
            <value>false</value>
        </property>
        <property>
            <name>dfs.webhdfs.enabled</name>
            <value>true</value>
        </property>
        <property>
            <name>dfs.permissions.enabled</name>
            <value>false</value>
        </property>
        <property>
            <name>dfs.client.use.datanode.hostname</name>
            <value>false</value>
        </property>
        <property>
            <name>dfs.datanode.use.datanode.hostname</name>
            <value>false</value>
        </property>

        <property>
            <name>dfs.replication</name> //datanode 2개에 각각 데이터 복제
            <value>2</value>
        </property>
        <property>
            <name>dfs.namenode.http-address</name>
            <value>172.26.15.165:9870</value>
        </property>
        <property>
            <name>dfs.namenode.rpc-address</name>
            <value>172.26.15.165:9000</value>
        </property>
        <property>
            <name>dfs.namenode.name.dir</name>
            <value>file:///usr/local/hadoop/hadoop_data/hdfs/namenode</value>
        </property>
        <property>
                    <name>dfs.datanode.data.dir</name>
            <value>file:///usr/local/hadoop/hadoop_data/hdfs/datanode</value>
        </property>
        <property>
            <name>dfs.datanode.address</name>
            <value>0.0.0.0:9866</value>
        </property>
    </configuration>
    ```

- /usr/local/hadoop/etc/hadoop/core-site.xml
  ```
  <configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://3.38.92.229:9000</value> //namenode ip, 이 설정으로 EC2 두개 연결한다.
    </property>
    </configuration>
  ```