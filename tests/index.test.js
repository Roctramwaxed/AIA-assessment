const request = require("supertest");
const app = require("../App");

// SUCCESS
describe("Successfully get images", () => {
  it("POST /images (No tags)", (done) => {
    request(app)
      .post("/images")
      .send({
        tags: "",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        const sampleData = body[0];
        expect(typeof sampleData).toBe("object");
        expect(sampleData).toHaveProperty("id");
        expect(sampleData).toHaveProperty("title");
        expect(sampleData).toHaveProperty("imageSrc");
        expect(sampleData).toHaveProperty("author");
        expect(sampleData).toHaveProperty("tags");
        done();
      });
  });

  it("POST /images (With tags = 'dinosaur')", (done) => {
    request(app)
      .post("/images")
      .send({
        tags: "dinosaur",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        const sampleData = body[0];
        expect(typeof sampleData).toBe("object");
        expect(sampleData).toHaveProperty("tags");
        expect(sampleData.tags).toEqual(expect.arrayContaining(["dinosaur"]));
        done();
      });
  });

  it("POST /images (With tags = 'dinosaur stegosaur')", (done) => {
    request(app)
      .post("/images")
      .send({
        tags: "dinosaur stegosaur",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        const sampleData = body[0];
        expect(typeof sampleData).toBe("object");
        expect(sampleData).toHaveProperty("tags");
        expect(sampleData.tags).toEqual(
          expect.arrayContaining(["dinosaur", "stegosaur"])
        );
        done();
      });
  });

  it("POST /images (With unintelligible tags = 'q2p98vy0wenyvhpfobaiuwn4tby', expecting zero result)", (done) => {
    request(app)
      .post("/images")
      .send({
        tags: "q2p98vy0wenyvhpfobaiuwn4tby",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body.length).toEqual(0);
        done();
      });
  });
});
