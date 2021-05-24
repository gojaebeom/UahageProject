"use strict";
const axios = require("axios");
const { createToken } = require("../../utils/jwt");
const repository = require("./userRepository");

// 카카오 로그인
exports.kakaoLogin = async (req, res) => {
    const email = req.kakaoEmail;

    // 이메일로 저장된 유저 아이디 확인 : 있으면 유저 아이디 반환, 없으면 0 반환
    let repoObject = await repository.findIdByEmail( email );

    // 이메일이 저장되지 않은 유저는 회원 정보 저장
    if( repoObject.result === 0 ){
        // store!
        const { nickname, ageGroupType, babyGender ,babyBirthday } = req.body;
        repoObject =await repository.store( 
            email, 
            nickname, 
            ageGroupType, 
            babyGender, 
            babyBirthday 
        );
        if(!repoObject.success) {
            return res.status(500).json({ message : "user store false", error : repoObject.error});
        }
        repoObject = await repository.findIdByEmail( email );
    }

    // 이후 토큰 발급
    const userId = repoObject.result.id;
    const jwtToken = createToken(userId);

    repoObject.success ? 
    res.status(200).json({ message : "login ok",  data : { token : jwtToken } }) : 
    res.status(500).json({ message : "server error", error : repoObject.error }); 
}

// 회원 정보 수정
exports.edit = async (req, res) => {
    const userId = req.params.id;
    const { nickname, ageGroupType, babyGender ,babyBirthday } = req.body;
    
    let repoObject;
    // 이미지 저장
    if( req.imagePath ) {
        const imagePath = req.imagePath;
        repoObject = await repository.storeImage( userId, imagePath );
        if( !repoObject.success ) return res.status(500).json({ message : "server error", data : false });
    }

    // 회원 정보 수정
    repoObject = await repository.edit( userId, nickname, ageGroupType, babyGender, babyBirthday ); 
    repoObject.success ? 
    res.status(200).json({ message : "status ok",  data : repoObject.result }) : 
    res.status(500).json({ message : "server error", error : repoObject.error }); 
}

// 닉네임 중복채크
exports.validateByNickname = async (req, res) => { 
    const nickname = req.params.nickname; 
    const { success, result, error } = await repository.validateByNickname( nickname ); 
    success ? 
    res.status(200).json({ message : "status ok",  data : result }) : 
    res.status(500).json({ message : "server error", error : error }); 
}

// 이메일 중복채크
exports.validateByEmail = async (req, res) => { 
    const email = req.params.email; 
    const { success, result, error } = await repository.validateByEmail( email ); 
    success ? 
    res.status(200).json({ message : "status ok",  data : result }) : 
    res.status(500).json({ message : "server error", error : error }); 
}

// 회원 상세정보
exports.show = async (req, res) => {
    const userId = req.params.id;
    const { success, result, error } = await repository.show( userId );
    success ? 
    res.status(200).json({ message : "status ok",  data : result }) : 
    res.status(500).json({ message : "server error", error : error }); 
}

// 회원 로그아웃 ( 미완료 )
exports.logout = (req, res) => {
    // 소셜로그인 토큰 인증방식에 따라 구현
    // 1. 소셜 로그인마다 받는 토큰과 리프레시 토큰이 다른경우
    // DB에 저장된 리프레시 토큰을 지우고 토큰 만료시키기
    // 2. 세션 방식일 경우 세션을 삭제 시키기
    res.status(200).json({ message : "status ok",  data : true });
}

// 회원 탈퇴 
exports.delete = async (req, res) => {
    const userId = req.params.id;
    const { success, result, error } = await repository.deleteStepOne( userId );
    success ? 
    res.status(200).json({ message : "status ok",  data : result }) : 
    res.status(500).json({ message : "server error", error : error }); 
}
