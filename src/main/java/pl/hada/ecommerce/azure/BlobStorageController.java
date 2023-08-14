package pl.hada.ecommerce.azure;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/blob")
public class BlobStorageController {

    private final BlobStorageService blobStorageService;

    public BlobStorageController(BlobStorageService blobStorageService) {
        this.blobStorageService = blobStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = blobStorageService.uploadFile(file);
            return ResponseEntity.ok("File uploaded successfully. FileName: " + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("An error occurred while uploading the file.");
        }
    }

    @GetMapping("/image/{fileName}")
    public ResponseEntity<String> getImageUrl(@PathVariable String fileName) {
        String imageUrl = blobStorageService.getImageUrl(fileName);
        return ResponseEntity.ok(imageUrl);
    }

    @GetMapping("/files")
    public ResponseEntity<List<String>> getAllFiles() {
        List<String> fileNames = blobStorageService.getAllFileNames();
        return ResponseEntity.ok(fileNames);
    }

}
