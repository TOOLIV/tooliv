package com.tooliv.server.domain.channel.api;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@Api(value = "Channel Video API", tags = {"Channel Video"})
@RequiredArgsConstructor
@RequestMapping("/api/channel-video")
public class ChannelVideoController {

//    private final ChannelVideoService channelVideoService;
//
//    private OpenVidu openVidu;
//
//    private String OPENVIDU_URL;
//    private String SECRET;
//
//    @Autowired
//    public ChannelVideoController(ChannelVideoService channelVideoService, @Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
//        this.channelVideoService = channelVideoService;
//
//        this.SECRET = secret;
//        this.OPENVIDU_URL = openviduUrl;
//        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
//    }
//
//    @PostMapping
//    @ApiOperation(value = "채널 화상회의 등록")
//    @ApiResponses({
//        @ApiResponse(code = 201, message = "채널 화상회의 등록 완료"),
//        @ApiResponse(code = 409, message = "채널 화상회의 등록 실패"),
//    })
//    public ResponseEntity<? extends BaseResponseDTO> registerChannelVideo (
//        @RequestBody @ApiParam(value = "채널 화상회의 등록 정보", required = true) RegisterChannelVideoRequestDTO registerChannelVideoRequestDTO)  throws OpenViduJavaClientException, OpenViduHttpException {
//        try {
//            channelVideoService.addChannelVideo(registerChannelVideoRequestDTO);
//        } catch (Exception e) {
//            return ResponseEntity.status(409).body(BaseResponseDTO.of("채널 화상회의 등록 실패"));
//        }
//        return ResponseEntity.status(201).body(BaseResponseDTO.of("채널 화상회의 등록 완료"));
//    }

}
