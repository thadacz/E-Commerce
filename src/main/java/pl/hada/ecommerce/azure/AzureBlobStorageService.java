package pl.hada.ecommerce.azure;

import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.specialized.BlockBlobClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class AzureBlobStorageService {
    @Value("${azure.storage.connection-string}")
    private String connectionString;

    @Value("${azure.storage.container-name}")
    private String containerName;

    public String uploadImage(MultipartFile imageFile, String imageName) throws IOException {
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
        BlockBlobClient blobClient = blobServiceClient.getBlobContainerClient(containerName).getBlobClient(imageName).getBlockBlobClient();
        try (InputStream imageStream = new BufferedInputStream(imageFile.getInputStream())) {
            blobClient.upload(imageStream, imageFile.getSize(), true);
        }

        return blobClient.getBlobUrl();
    }
}
