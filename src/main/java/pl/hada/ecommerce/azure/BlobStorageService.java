package pl.hada.ecommerce.azure;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.models.BlobItem;
import com.azure.storage.blob.specialized.BlobOutputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BlobStorageService {


    private final BlobServiceClient blobServiceClient;

    @Value("${azure.storage.container-name}")
    private String containerName;

    public BlobStorageService(BlobServiceClient blobServiceClient) {
        this.blobServiceClient = blobServiceClient;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
        BlobOutputStream blobOutputStream = containerClient.getBlobClient(fileName).getBlockBlobClient().getBlobOutputStream();
        blobOutputStream.write(file.getBytes());
        blobOutputStream.close();
        return fileName;
    }

    public String getImageUrl(String fileName) {
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
        return containerClient.getBlobClient(fileName).getBlobUrl();
    }

    public List<String> getAllFileNames() {
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
        List<String> fileNames = new ArrayList<>();
        for (BlobItem blobItem : containerClient.listBlobs()) {
            fileNames.add(blobItem.getName());
        }
        return fileNames;
    }

}

