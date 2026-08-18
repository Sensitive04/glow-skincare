import { supabase } from "./lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data;
}

export async function addProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();
  if (error) {
    console.error("Error adding product:", error);
    throw error;
  }
  return data;
}

export async function updateProduct(id, updates) {
  const { error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);
  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function seedProducts(products) {
  const { error } = await supabase.from("products").insert(products);
  if (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
