import {RSA} from './DigitalIdentityHelpers' ;


const generate () =>{
    const {
        serialNum,
        subject,
        validityPeriod,
        userEmail,
        organization,
        CAprivateKey,
        version,
        country,
      } = req;

    const RSAR = await RSA.RSA();
    const customPublicKey = RSAR.publicKey;
    const customPrivateKey = RSAR.privateKey;

    const { publicKey, privateKey } = RSA.customKeyToForgeKey(
        customPublicKey,
        customPrivateKey
    );

    const user = await models.User.findOne({ where: { email: userEmail } });

    if (user) {
    const certificate = await models.DigitalCertificates.create({
        user_id: user.id,
        version: version,
        serialNumber: serialNum,
        organization: organization,
        signatureAlgorithm: "RSA",
        issuer: req.admin.firstName + " " + req.admin.lastName,
        validatePeriod: validityPeriod,
        subject: subject,
    });
    }

    const publicK = await models.PublicKeys.create({
    user_id: user.id,
    publicKey: publicKey,
    });
    const csr = forge.pki.createCertificationRequest();
    csr.publicKey = publicKey;
    csr.setSubject([
    { name: "full Name", value: fullName },
    { name: "version", value: version },
    { name: "Serial number", value: serialNum },
    { name: "Subject", value: subject },
    { name: "Issuer", value: req.admin.firstName + " " + req.admin.lastName },
    { name: "Validity period", value: validityPeriod },
    { name: "Public key", value: publicKey },
    { name: "countryName", value: country },
    { name: "emailAddress", value: userEmail },
    ]);
    csr.addAttribute({
    name: "extensionRequest",
    extensions: [
        {
        name: "subjectAltName",
        altNames: [
            {
            type: 2,
            value: "www.example.com",
            },
            {
            type: 1,
            value: "john.doe@example.com",
            },
        ],
        },
        {
        name: "keyUsage",
        critical: true,
        ivalues: ["digitalSignature", "keyEncipherment"],
        },
        {
        name: "extendedKeyUsage",
        critical: true,

        value: ["serverAuth", "clientAuth"],
        },
    ],
    });

    csr.sign(CAprivateKey);

    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
    // const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
    const csrPem = forge.pki.certificationRequestToPem(csr);

    const platform = os.platform();

    let filePathKey;
    let filePathCsr;

    if (platform === "win32" || platform === "darwin" || platform === "linux") {
    const desktopDir = path.join(os.homedir(), "Desktop");
    filePathKey = path.join(desktopDir, "user.key");
    filePathCsr = path.join(desktopDir, "user.csr");
    } else if (platform === "android" || platform === "ios") {
    const downloadsDir = path.join(os.homedir(), "Downloads", "CustomFolder");
    fs.mkdirSync(downloadsDir, { recursive: true });
    filePathKey = path.join(downloadsDir, "user.key");
    filePathCsr = path.join(downloadsDir, "user.csr");
    } else {
    throw new Error("Unsupported platform");
    }

    fs.writeFileSync(filePathKey, privateKeyPem);
    fs.writeFileSync(filePathCsr, csrPem);



}
