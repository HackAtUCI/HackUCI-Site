yum install -y libxml2-devel xmlsec1-devel xmlsec1-openssl-devel libtool-ltdl-devel
lib_files=(
   libltdl.so.7
   libltdl.so.7.3.0
   libxml2.so.2
   libxml2.so.2.9.1
   libxmlsec1-openssl.so
   libxmlsec1-openssl.so.1.2.20
   libxmlsec1.so.1
   libxmlsec1.so.1.2.20
   libxslt.so.1
   libxslt.so.1.1.28
)

mkdir lib
for file in "${lib_files[@]}"
do
   cp /usr/lib64/$file lib/
done

echo $PWD
ls
ls lib
