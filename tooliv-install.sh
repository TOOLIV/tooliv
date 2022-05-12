
apt-get update
apt-get install -y openjdk-8-jdk
apt-get install -y wget
apt-get install -y unzip

wget https://services.gradle.org/distributions/gradle-7.4-bin.zip -P /tmp
unzip -d /opt/gradle /tmp/gradle-${VERSION}-bin.zip
ln -s /opt/gradle/gradle-${VERSION} /opt/gradle/latest

apt update
apt install -y apt-transport-https
apt install -y ca-certificates
apt install -y curl
apt install -y software-properties-common

curl -fsSL [https://download.docker.com/linux/ubuntu/gpg](https://download.docker.com/linux/ubuntu/gpg) | sudo apt-key add -
add-apt-repository "deb [arch=amd64] [https://download.docker.com/linux/ubuntu](https://download.docker.com/linux/ubuntu) bionic stable"
apt-cache policy docker-ce
apt install -y docker-ce

docker volume create tooliv-volume
docker volume create tooliv-db-volume
docker network create tooliv-network

curl -L [https://github.com/docker/compose/releases/latest/download/docker-compose-$](https://github.com/docker/compose/releases/latest/download/docker-compose-$)(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x ${path}/usr/local/bin/docker-compose
