package handlers

import (
	"context"
	"encoding/json"
	"monorepo/models"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserHandler struct {
	Collection *mongo.Collection
}

// CREATE
func (h *UserHandler) Create(w http.ResponseWriter, r *http.Request) {
	var body map[string]string
	json.NewDecoder(r.Body).Decode(&body)

	if body["name"] == "" || body["email"] == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	h.Collection.InsertOne(context.TODO(), body)
	w.WriteHeader(http.StatusCreated)
}

// GET ALL
func (h *UserHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	var users []models.User

	cursor, err := h.Collection.Find(context.TODO(), bson.M{})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := cursor.All(context.TODO(), &users); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}

// UPDATE
func (h *UserHandler) Update(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	oid, _ := primitive.ObjectIDFromHex(id)

	var body map[string]interface{}
	json.NewDecoder(r.Body).Decode(&body)

	h.Collection.UpdateOne(
		context.TODO(),
		bson.M{"_id": oid},
		bson.M{"$set": body},
	)
	w.WriteHeader(http.StatusOK)
}

// DELETE
func (h *UserHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	oid, _ := primitive.ObjectIDFromHex(id)

	h.Collection.DeleteOne(context.TODO(), bson.M{"_id": oid})
	w.WriteHeader(http.StatusOK)
}
